// @flow

import React, {useEffect, useRef, useState} from "react";
import {useMap} from "../../services/hooks/useMaps";
import MainLayout from "../Main.Layout";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import subscriptionPromise from "../../services/queries/chat/chat-subscription";
import type { Element, AbstractComponent } from "react";
import type {MainLayoutProps} from "../Main.Layout";
import ChatInput from "./ChatInput";
import {subscribe} from "../../services/relay-utils";
import type {ChatEntry} from "../../services/queries/chat/ChatQueries";
import {chatEntriesQueryPromise} from "../../services/queries/chat/ChatQueries";
import chatEntryMutationPromise from "../../services/queries/chat/chat-mutation";
import {useHistory} from "react-router-dom";
import {useSession} from "../../services/hooks/useSession";
import ChatEntryComponent from "./ChatEntryComponent";

type ChatProps = {
    setError: (string, ?string) => void;
    id: string;
}

const Chat = ({ setError, id }: ChatProps): Element<AbstractComponent<MainLayoutProps>> => {
    const history = useHistory();
    const map = useMap(id);
    const session = useSession(history);

    const [entries, setEntries] = useState<Array<ChatEntry>>([]);

    const chatContainer = useRef();

    const scrollToBottom = () => {
        const obj: any = chatContainer.current;
        // obj.scrollIntoView();
        obj.scrollTop = obj.scrollHeight;
    }

    useEffect(() => {
        chatEntriesQueryPromise(id)
            .then(c => {
                console.log("c", c);
                setEntries(c);
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
            return entries?.map(e => ChatEntryComponent(classes, e));
        }

        return [];
    }

    const onNewEntry = (entry: string) => {
        console.log("new entry", entry);
        if (!session.character?.id) {
            setError("You must select a character to play.");
        }
        else {
            chatEntryMutationPromise({
                characterId: String(session.character?.id) ?? "",
                chatMapId: id,
                text: entry,
            })
                .then(result => console.log("result", result))
                .catch(error => setError(error));
        }
    }

    return (
        <MainLayout>
            { (classes: any) =>
                <Container className={classes.chatRootContainer}>
                    <div className={classes.chatEntriesContainer} ref={chatContainer}>
                        {showEntries(classes)}
                    </div>
                    <div className={classes.chatInputControl}>
                        <ChatInput setError={setError} classes={classes} newChatEntry={onNewEntry} />
                    </div>
                </Container>
            }
        </MainLayout>
    );
}

export default Chat;
