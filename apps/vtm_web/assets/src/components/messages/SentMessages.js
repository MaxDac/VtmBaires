// @flow

import React, {Suspense} from "react";
import MainLayout from "../Main.Layout";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {userSentMessagesQuery} from "../../services/queries/messages/UserSentMessagesQuery";
import List from "@mui/material/List";
import type {UserSentMessagesQuery} from "../../services/queries/messages/__generated__/UserSentMessagesQuery.graphql";
import MessageListItem from "./components/MessageListItem";

const SentMessages = (): any => {
    const messages = useCustomLazyLoadQuery<UserSentMessagesQuery>(userSentMessagesQuery, {}, {
        fetchPolicy: "store-and-network"
    });

    const messageList = () =>
        (messages?.me?.sentMessages ?? [])
            ?.map(m =>
                m != null
                    ? (<MessageListItem message={{
                        id: m.id,
                        subject: m.subject,
                        onGame: m.onGame,
                        read: m.read,
                        insertedAt: m.insertedAt,
                        modifiedAt: m.modifiedAt,
                        receiverUser: {...m.receiverUser},
                        receiverCharacter: m.receiverCharacter?.id != null
                            ? {...m.receiverCharacter}
                            : null
                    }} />)
                    : <></>);

    return (
        <MainLayout>
            <Suspense fallback={"Loading..."}>
                <List sx={{width: "100%", bgcolor: "background.paper"}}>
                    {messageList()}
                </List>
            </Suspense>
        </MainLayout>
    );
}

export default SentMessages;
