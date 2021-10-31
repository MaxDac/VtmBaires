// @flow

import React, {useContext, useEffect, useState, Suspense} from "react";
import subscriptionObservable from "../../services/subscriptions/ChatSubscription";
import ChatInput from "./controls/ChatInput";
import {subscribe} from "../../_base/relay-utils";
import chatEntryMutationPromise from "../../services/mutations/chat/CreateChatEntryMutation";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import useMap from "../../services/queries/map/MapQuery";
import Box from "@mui/material/Box";
import {useRelayEnvironment} from "react-relay";
import type {ChatDiceRequest} from "./controls/ChatThrowDiceInput";
import chatDiceEntryMutationPromise from "../../services/mutations/chat/CreateChatDiceEntry";
import ChatControls from "./controls/ChatControls";
import useSubscriptionTokenQuery from "../../services/queries/accounts/SubscriptionTokenQuery";
import {UtilityContext} from "../../contexts";
import {useSession} from "../../services/session-service";
import {updateSessionMap} from "../../services/mutations/sessions/UpdateSessionMapMutation";
import {Typography} from "@mui/material";
import ChatMasterModal from "./modals/ChatMasterModal";
import ChatDescriptionModal from "./modals/ChatDescriptionModal";
import ChatStatusModal from "./modals/ChatStatusModal";
import {useChatEntries} from "./hooks/ChatEntriesHook";
import ChatScreen from "./ChatScreen";
import type { ChatEntry } from "../../services/base-types";
import DefaultFallback from "../../_base/components/DefaultFallback";

type ChatProps = {
    id: string;
}

const Chat = ({id}: ChatProps): any => {
    const environment = useRelayEnvironment();
    const map = useMap(id);
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

    const initialEntries = useChatEntries(id);
    const chatToken = useSubscriptionTokenQuery();

    const [additionalEntries, setAdditionalEntries] = useState<Array<ChatEntry>>([]);

    useEffect(() => {
        updateSessionMap(environment, id)
            .then(r => console.log("Received response while attempting updating the session", r))
            .catch(e => console.error("Error while updating session map", e))
    }, [environment, id])

    useEffect(() => {
        const handleUnhandledExceptionAtChat = e => {
            console.error("Unhandled error while subscribing", e);

            if (typeof e === "string" && e.indexOf("message [") !== -1) {
                document.location.reload();
            }
        };

        window.addEventListener("unhandledrejection", handleUnhandledExceptionAtChat);

        const showNewChatEntry = entry => setAdditionalEntries(es => [...es, entry]);

        const performSubscription = () =>
            subscribe(subscriptionObservable(id, chatToken), showNewChatEntry, (e, _) => {
                console.error("Error while performing chat subscription.", e);
                // showUserNotification({
                //     type: "error",
                //     message: "C'è stato un problema nella connessione della chat, ricarica la pagina per ritentare."
                // });
                // Trying to reload the page instead
                document.location.reload();
            });

        if (chatToken != null && chatToken !== "") {
            console.log("subscribing");
            const subscription = performSubscription();
            return () => {
                console.info("unsubscribing");
                window.removeEventListener("unhandledrejection", handleUnhandledExceptionAtChat);
                subscription.unsubscribe();
            };
        }
    // eslint-disable-next-line
    }, [id, chatToken]);

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
        if (character?.id != null && map?.id != null) {
            action(character.id, map.id)
                // .then(result => console.log("result", result))
                .catch(error => showUserNotification({ type: 'error', graphqlError: error, message: "An error happened while sending the chat" }));
        }

        if (!character?.id) {
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
                difficulty: request.difficulty,
                freeThrow: request.freeThrow,
                master: request.master,
                characterId: characterId,
                chatMapId: mapId
            }));

    const showChatInput = () => {
        if (character?.approved) {
            return (
                <ChatInput newChatEntry={onNewEntry} newDiceEntry={onNewDiceEntry} />
            );
        }

        return (
            <Typography>
                Il tuo personaggio non &egrave; ancora stato accetato.
            </Typography>
        )
    };

    const showChatMasterModal = () => {
        if (selectedCharacterId != null && selectedCharacterName != null) {
            return <ChatMasterModal mapId={id}
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
                                mapId={id} />
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
}

export default Chat;
