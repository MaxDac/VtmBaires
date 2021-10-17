// @flow

import React, {useContext, useEffect, useRef, useState} from "react";
import MainLayout from "../MainLayout";
import subscriptionObservable from "../../services/subscriptions/ChatSubscription";
import ChatInput from "./controls/ChatInput";
import {subscribe} from "../../_base/relay-utils";
import List from "@mui/material/List";
import ChatEntryComponent from "./ChatEntryComponent";
import chatEntryMutationPromise from "../../services/mutations/chat/CreateChatEntryMutation";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import useMap from "../../services/queries/map/MapQuery";
import {useChatEntriesQuery} from "../../services/queries/chat/GetChatEntriesQuery";
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

type ChatProps = {
    id: string;
}

const Chat = ({id}: ChatProps): any => {
    const environment = useRelayEnvironment();
    const map = useMap(id);
    const [user,character] = useSession();

    const isMaster = () => user?.role === "MASTER";

    const {
        showUserNotification,
        openDialog
    } = useContext(UtilityContext);

    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState(map?.name);
    const [modalDescription, setModalDescription] = useState(map?.description);

    const [characterModalOpen, setCharacterModalOpen] = useState(false);
    const [selectedCharacterId, setSelectedCharacterId] = useState<?string>(null);
    const [selectedCharacterName, setSelectedCharacterName] = useState<?string>(null);
    const [characterStatusOpen, setCharacterStatusOpen] = useState(false);

    const initialEntries = useChatEntriesQuery(id);
    const [entries, setEntries] = useState(initialEntries);
    const chatToken = useSubscriptionTokenQuery();

    const chatContainer = useRef();

    useEffect(() => {
        updateSessionMap(environment, id)
            .then(r => console.log("Received response while attempting updating the session", r))
            .catch(e => console.error("Error while updating session map", e))
    }, [environment, id])

    useEffect(() => {
        const showNewChatEntry = entry => setEntries(es => [...es, entry]);
        const subscription = subscribe(subscriptionObservable(id, chatToken), showNewChatEntry);
        return () => subscription.unsubscribe();
    }, [id, chatToken]);

    // This was previously used as a dependency for the following useEffect, but it seems that it doesn't update itself.
    // The operation performed inside the following useEffect is not asynchronous or difficult at all anyway
    // const chatContainerScrollHeight: number = (chatContainer.current: any)?.scrollHeight;

    useEffect(() => {
        const obj: any = chatContainer.current;
        // obj.scrollIntoView();
        obj.scrollTop = obj.scrollHeight;
    });

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

    const showEntries = () => {
        if (entries && entries.map) {
            return entries?.map((e, index) => {
                if (e != null) {
                    return (
                        <ChatEntryComponent entry={e}
                                            key={e.id}
                                            isLast={index === entries.length - 1}
                                            showCharacterDescription={showCharacterDescription} />
                    );
                }

                return (<></>);
            });
        }

        return [];
    }

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
    }

    const onNewEntry = (entry: string) =>
        createEntry((characterId, mapId) =>
            chatEntryMutationPromise(environment, {
                characterId: characterId,
                chatMapId: mapId,
                text: entry,
            }));

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
            <ChatMasterModal mapId={id}
                             characterId={selectedCharacterId}
                             characterName={selectedCharacterName}
                             closeModal={() => setCharacterModalOpen(_ => false)} />
        }

        return (<></>);
    }

    return (
        <MainLayout openDialog={openDialog}>
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
                    height: "calc(100% - 67px)",
                    overflow: "hidden"
                }} id="chat-entries">
                    <ChatControls openMapModal={() => showMapDescription()}
                                  openCharacterStatusPopup={() => setCharacterStatusOpen(_ => true)}
                                  mapId={id} />
                    <List sx={{
                        flex: "4 0",
                        overflowY: "scroll"
                    }} ref={chatContainer}>
                        {showEntries()}
                    </List>
                    <Box component="div" sx={{
                        flex: "0 1 100px",
                        width: "100%"
                    }}>
                        {showChatInput()}
                    </Box>
                </Box>
            </>
        </MainLayout>
    );
}

export default Chat;
