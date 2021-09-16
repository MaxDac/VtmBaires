// @flow

import React, {useContext, useEffect, useRef, useState} from "react";
import MainLayout from "../Main.Layout";
import Container from "@material-ui/core/Container";
import subscriptionPromise from "../../services/subscriptions/ChatSubscription";
import type { Element, AbstractComponent } from "react";
import type {MainLayoutProps} from "../Main.Layout";
import ChatInput from "./ChatInput";
import {subscribe} from "../../_base/relay-utils";
import List from "@material-ui/core/List";
import ChatEntryComponent from "./ChatEntryComponent";
import chatEntryMutationPromise from "../../services/mutations/chat/CreateChatEntryMutation";
import {SessionContext, UtilityContext} from "../../App";
import Fab from "@material-ui/core/Fab";
import RoomIcon from "@material-ui/icons/Room";
import Zoom from "@material-ui/core/Zoom";
import {useTheme} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useMap from "../../services/queries/map/MapQuery";
import {getChatEntries} from "../../services/queries/chat/GetChatEntriesQuery";
import type {ChatEntry} from "../../services/base-types";

type ChatProps = {
    id: string;
}

const Chat = ({ id }: ChatProps): Element<AbstractComponent<MainLayoutProps>> => {
    const theme = useTheme();
    const map = useMap(id);
    const { getCharacter: ch } = useContext(SessionContext);

    const character = ch();

    const {
        setError,
        openDialog
    } = useContext(UtilityContext);

    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [entries, setEntries] = useState<Array<ChatEntry>>([]);

    const chatContainer = useRef();

    const scrollToBottom = () => {
        const obj: any = chatContainer.current;
        // obj.scrollIntoView();
        obj.scrollTop = obj.scrollHeight;
    }

    useEffect(() => {
        getChatEntries(id)
            .then(c => {
                setEntries(c ?? []);
                scrollToBottom();
            })
            .catch(e => console.error("Error while retrieving the character", e));
    }, [id]);

    useEffect(() => {
        const showNewChatEntry = entry => setEntries(es => [...es, entry]);
        const subscription = subscribe(subscriptionPromise(id), showNewChatEntry);
        return () => subscription.unsubscribe();
    }, [id]);

    useEffect(() => scrollToBottom());

    const showEntries = classes => {
        if (entries && entries.map) {
            return entries?.map((e, index) =>
                <ChatEntryComponent classes={classes}
                                    entry={e}
                                    key={e.id}
                                    isLast={index === entries.length - 1} />);
        }

        return [];
    }

    const onNewEntry = (entry: string) => {
        if (!character?.id) {
            setError({ type: 'error', message: "You must select a character to play."});
        }
        else {
            chatEntryMutationPromise({
                characterId: String(character?.id) ?? "",
                chatMapId: id,
                text: entry,
            })
                .then(result => console.log("result", result))
                .catch(error => setError({ type: 'error', graphqlError: error, message: "An error happened while sending the chat" }));
        }
    }

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <MainLayout openDialog={openDialog}>
            { (classes: any) =>
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
                    <Container className={classes.chatRootContainer}>
                        <List className={classes.chatEntriesContainer} ref={chatContainer}>
                            {showEntries(classes)}
                        </List>
                        <div className={classes.chatInputControl}>
                            <ChatInput setError={setError} classes={classes} newChatEntry={onNewEntry} />
                        </div>
                    </Container>
                    <Zoom timeout={transitionDuration}
                          in
                          style={{ transitionDelay: transitionDuration.exit }}
                          unmountOnExit>
                        <Fab color="secondary"
                             aria-label="map"
                             className={classes.fab}
                             onClick={_ => setMapModalOpen(true)}>
                            <RoomIcon />
                        </Fab>
                    </Zoom>
                </>
            }
        </MainLayout>
    );
}

export default Chat;
