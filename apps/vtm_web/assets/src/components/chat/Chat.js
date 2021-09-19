// @flow

import React, {useContext, useEffect, useRef, useState} from "react";
import MainLayout from "../Main.Layout";
import subscriptionPromise from "../../services/subscriptions/ChatSubscription";
import ChatInput from "./ChatInput";
import {subscribe} from "../../_base/relay-utils";
import List from "@mui/material/List";
import ChatEntryComponent from "./ChatEntryComponent";
import chatEntryMutationPromise from "../../services/mutations/chat/CreateChatEntryMutation";
import {SessionContext, UtilityContext} from "../../App";
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
import {ChatDiceRequest} from "./ChatThrowDiceInput";
import chatDiceEntryMutationPromise from "../../services/mutations/chat/CreateChatDiceEntry";
import ChatControls from "./ChatControls";

type ChatProps = {
    id: string;
}

const Chat = ({ id }: ChatProps): any => {
    const environment = useRelayEnvironment();
    const map = useMap(id);
    const { getCharacter: ch } = useContext(SessionContext);

    const character = ch();

    const {
        setError,
        openDialog
    } = useContext(UtilityContext);

    const [mapModalOpen, setMapModalOpen] = useState(false);
    const initialEntries = useChatEntriesQuery(id);
    const [entries, setEntries] = useState(initialEntries);

    const chatContainer = useRef();

    const scrollToBottom = () => {
        const obj: any = chatContainer.current;
        // obj.scrollIntoView();
        obj.scrollTop = obj.scrollHeight;
    }

    useEffect(() => {
        const showNewChatEntry = entry => setEntries(es => [...es, entry]);
        const subscription = subscribe(subscriptionPromise(id), showNewChatEntry);
        return () => subscription.unsubscribe();
    }, [id]);

    useEffect(() => {
        console.log("passing");
        scrollToBottom();
    });

    const showEntries = () => {
        if (entries && entries.map) {
            return entries?.map((e, index) => {
                if (e != null) {
                    return (
                        <ChatEntryComponent entry={e}
                                            key={e.id}
                                            isLast={index === entries.length - 1}/>
                    );
                }

                return (<></>);
            });
        }

        return [];
    }

    const createEntry = (action: (string, string) => Proise<any>) => {
        if (character?.id != null && map?.id != null) {
            action(character.id, map.id)
                .then(result => console.log("result", result))
                .catch(error => setError({ type: 'error', graphqlError: error, message: "An error happened while sending the chat" }));
        }

        if (!character?.id) {
            setError({ type: 'error', message: "You must select a character to play."});
        }

        if (!map?.id) {
            setError({ type: 'error', message: "You're not on a map."});
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
                ...request,
                characterId: characterId,
                chatMapId: mapId
            }));

    return (
        <MainLayout openDialog={openDialog}>
            <>
                <Dialog open={mapModalOpen}
                        onClose={_ => setMapModalOpen(false)}
                        aria-labelledby="map-info">
                    <DialogTitle>
                        {map?.name}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {map?.description}
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
                        <ChatInput setError={setError} newChatEntry={onNewEntry} newDiceEntry={onNewDiceEntry} />
                    </Box>
                </Box>
                <ChatControls openMapModal={() => setMapModalOpen(true)} />
            </>
        </MainLayout>
    );
}

export default Chat;
