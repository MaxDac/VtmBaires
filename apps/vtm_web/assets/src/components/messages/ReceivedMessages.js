// @flow

import React, {Suspense} from "react";
import MainLayout from "../MainLayout";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {userReceivedMessagesQuery} from "../../services/queries/messages/UserReceivedMessagesQuery";
import List from "@mui/material/List";
import type {UserReceivedMessagesQuery} from "../../services/queries/messages/__generated__/UserReceivedMessagesQuery.graphql";
import MessageListItem from "./components/MessageListItem";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import {Routes} from "../../AppRouter";

const ReceivedMessages = (): any => {
    const history = useHistory();

    const messages = useCustomLazyLoadQuery<UserReceivedMessagesQuery>(userReceivedMessagesQuery, {}, {
        fetchPolicy: "store-and-network"
    });

    const messageList = () =>
        (messages?.me?.receivedMessages ?? [])
            ?.map(m =>
                m != null
                    ? (<MessageListItem key={m.id} message={{
                        id: m.id,
                        subject: m.subject,
                        onGame: m.onGame,
                        read: m.read,
                        insertedAt: m.insertedAt,
                        modifiedAt: m.modifiedAt,
                        senderUser: {...m.senderUser},
                        senderCharacter: m.senderCharacter
                            ? {...m.senderCharacter}
                            : null
                    }} />)
                    : <></>);

    return (
        <MainLayout>
            <div style={{textAlign: "right"}}>
                <Button type="submit" onClick={_ => history.push(Routes.newMessage())}>
                    Scrivi nuovo
                </Button>
                <Button type="submit" onClick={_ => history.push(Routes.sentMessages)}>
                    Messaggi inviati
                </Button>
            </div>
            <Suspense fallback={"Loading..."}>
                <List sx={{width: "100%", bgcolor: "background.paper"}}>
                    {messageList()}
                </List>
            </Suspense>
        </MainLayout>
    );
}

export default ReceivedMessages;
