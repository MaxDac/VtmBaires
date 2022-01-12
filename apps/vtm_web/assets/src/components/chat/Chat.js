// @flow

import React, {useContext, useEffect, useState, Suspense, useRef} from "react";
import ChatInput from "./controls/ChatInput";
import chatEntryMutationPromise from "../../services/mutations/chat/CreateChatEntryMutation";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import useMap from "../../services/queries/map/MapQuery";
import type {Map} from "../../services/base-types";
import Box from "@mui/material/Box";
import {useRelayEnvironment} from "react-relay";
import type {ChatDiceRequest} from "./controls/ChatThrowDiceInput";
import chatDiceEntryMutationPromise from "../../services/mutations/chat/CreateChatDiceEntry";
import ChatControls from "./controls/ChatControls";
import {SessionContext, UtilityContext} from "../../contexts";
import {getSessionSync, useSession} from "../../services/session-service";
import {Typography} from "@mui/material";
import ChatMasterModal from "./modals/ChatMasterModal";
import ChatDescriptionModal from "./modals/ChatDescriptionModal";
import ChatStatusModal from "./modals/ChatStatusModal";
import {useChatEntries} from "./hooks/ChatEntriesHook";
import ChatScreen from "./ChatScreen";
import type { ChatEntry } from "../../services/base-types";
import DefaultFallback from "../../_base/components/DefaultFallback";
import useChatSubscription from "../_hooks/useChatSubscription";
import {getFileTextFromChatEntries} from "./chat-helpers";
import {downloadFile} from "../../_base/file-utils";
import {useUpdateSessionMap} from "../_hooks/useUpdateSessionMap";
import {useHasUserAccessToMap} from "../../services/queries/map/HasUserAccessToMapQuery";
import {useIsCharacterAwake} from "../../services/queries/character/IsCharacterAwakeQuery";

type ChatProps = {
    map: Map
}

const Chat = ({id}: {id: string}): any => {
    const map = useMap(id);
    const userHasAccess = useHasUserAccessToMap(id);

    if (map != null && (map.isPrivate === false || userHasAccess)) {
        return (<ChatInternal map={map} />);
    }

    return (
        <h2>
            Non hai accesso a questa chat
        </h2>
    );
};

const ShowChatInput = ({character, characterId, onNewEntry, onNewDiceEntry}) => {
    const isCharacterAwake = useIsCharacterAwake(characterId, 1);

    if (!isCharacterAwake) {
        return (
            <Typography>
                Devi risvegliare il personaggio per poter giocare. Una volta risvegliato, potresti dover aggiornare
                la pagina.
            </Typography>
        );
    }

    if (character?.approved) {
        return (
            <ChatInput newChatEntry={onNewEntry}
                       newDiceEntry={onNewDiceEntry} />
        );
    }

    return (
        <Typography>
            Il tuo personaggio non &egrave; ancora stato accettato.
        </Typography>
    )
};

const ChatInternal = ({map}: ChatProps): any => {
    const session = useRef(useContext(SessionContext));

    const environment = useRelayEnvironment();
    const [user,character] = useSession();

    const isMaster = () => user?.role === "MASTER";

    const {showUserNotification} = useContext(UtilityContext);

    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState(map?.name);
    const [modalDescription, setModalDescription] = useState(map?.description);

    const [characterModalOpen, setCharacterModalOpen] = useState(false);
    const [selectedCharacterId, setSelectedCharacterId] = useState<?string>(null);
    const [selectedCharacterName, setSelectedCharacterName] = useState<?string>(null);
    const [characterStatusOpen, setCharacterStatusOpen] = useState(false);

    const initialEntries = useChatEntries(map.id);
    const [additionalEntries, setAdditionalEntries] = useState<Array<ChatEntry>>([]);

    useChatSubscription(map.id, setAdditionalEntries);
    useUpdateSessionMap(map.id);

    useEffect(() => {
        if (map?.id != null) {
            session.current?.setCurrentLocation({
                id: map.id,
                name: map?.name
            });
        }
    }, [map])

    const showMapDescription = () => {
        setModalTitle(_ => map?.name);
        setModalDescription(_ => map?.description);
        setMapModalOpen(_ => true);
    };

    const showCharacterDescription = (id, name) => {
        setSelectedCharacterId(_ => id);
        setSelectedCharacterName(_ => name);
        setCharacterModalOpen(_ => true);
    };

    const createEntry = (action: (string, string) => Promise<any>) => {
        // Bug
        // If the master changes the character in the left hand side menu, being in the chat doesn't update the
        // character in session directly, because here it's a closure.
        const ch = getSessionSync()?.character;

        if (ch?.id != null && map?.id != null) {
            action(ch.id, map.id)
                .catch(error => showUserNotification({ type: 'error', graphqlError: error, message: "An error happened while sending the chat" }));
        }

        if (!ch?.id) {
            showUserNotification({ type: 'error', message: "You must select a character to play."});
        }

        if (!map?.id) {
            showUserNotification({ type: 'error', message: "You're not on a map."});
        }
    };

    const parseEntry = (entry: string): [boolean, string] => {
        const [first,] = entry;

        if (first === "+") {
            return [true, entry.substring(1)];
        }

        return [false, entry];
    };

    const onNewEntry = (entry: string) => {
        if (entry != null && entry !== "") {
            const [offGame, parsedEntry] = parseEntry(entry);

            createEntry((characterId, mapId) =>
                chatEntryMutationPromise(environment, {
                    characterId: characterId,
                    chatMapId: mapId,
                    offGame: offGame,
                    text: parsedEntry,
                }));
        }
    };

    const onNewDiceEntry = (request: ChatDiceRequest) =>
        createEntry((characterId, mapId) =>
            chatDiceEntryMutationPromise(environment, {
                abilityId: request.abilityId,
                attributeId: request.attributeId,
                forDiscipline: request.forDiscipline,
                augmentAttribute: request.augmentAttribute,
                difficulty: request.difficulty,
                freeThrow: request.freeThrow,
                master: request.master,
                characterId: characterId,
                chatMapId: mapId
            }));

    const showChatInput = () => {
        if (character?.id != null) {
            return (
                <ShowChatInput characterId={character.id}
                               character={character}
                               onNewEntry={onNewEntry}
                               onNewDiceEntry={onNewDiceEntry} />
            );
        }

        return (
            <Typography>
                Non hai selezionato nessun personaggio.
            </Typography>
        );
    };

    const downloadChat = () => {
        const fileText = getFileTextFromChatEntries(initialEntries.concat(additionalEntries));
        downloadFile("chat.txt", fileText);
    };

    const showChatMasterModal = () => {
        if (selectedCharacterId != null && selectedCharacterName != null) {
            return <ChatMasterModal mapId={map.id}
                                    characterId={selectedCharacterId}
                                    characterName={selectedCharacterName}
                                    closeModal={() => setCharacterModalOpen(_ => false)} />
        }

        return (<></>);
    }

    return (
        <>
            <Dialog open={characterModalOpen && isMaster()}
                    onClose={_ => setCharacterModalOpen(_ => false)}
                    fullScreen
                    aria-labelledby="character-modal">
                {showChatMasterModal()}
            </Dialog>
            <Dialog open={characterModalOpen && !isMaster()}
                    onClose={_ => setMapModalOpen(false)}
                    aria-labelledby="character-description">
                <ChatDescriptionModal characterId={selectedCharacterId}
                                        close={() => setCharacterModalOpen(_ => false)} />
            </Dialog>
            <Dialog open={characterStatusOpen}
                    onClose={_ => setCharacterStatusOpen(_ => false)}
                    maxWidth="sm"
                    fullWidth
                    aria-labelledby="character-status">
                <ChatStatusModal characterId={character?.id}
                                    close={() => setCharacterStatusOpen(_ => false)} />
            </Dialog>
            <Dialog open={mapModalOpen}
                    onClose={_ => setMapModalOpen(false)}
                    aria-labelledby="map-info">
                <DialogTitle>
                    {modalTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {modalDescription}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={_ => setMapModalOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Box component="div" sx={{
                display: "flex",
                flexDirection: "column",
                height: "calc(100% - 47px)",
                overflow: "hidden"
            }} id="chat-entries">
                <ChatControls openMapModal={() => showMapDescription()}
                              openCharacterStatusPopup={() => setCharacterStatusOpen(_ => true)}
                              mapId={map.id}
                              onChatLogRequested={downloadChat} />
                <Suspense fallback={<DefaultFallback />}>
                    <ChatScreen entries={initialEntries}
                                additionalEntries={additionalEntries}
                                showCharacterDescription={showCharacterDescription} />
                </Suspense>
                <Box component="div" sx={{
                    flex: "0 1 100px",
                    width: "100%"
                }}>
                    {showChatInput()}
                </Box>
            </Box>
        </>
    );
};

export default Chat;
