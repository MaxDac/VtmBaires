// @flow

import React, {Suspense} from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {userSentMessagesQuery} from "../../services/queries/messages/UserSentMessagesQuery";
import List from "@mui/material/List";
import type {UserSentMessagesQuery} from "../../services/queries/messages/__generated__/UserSentMessagesQuery.graphql";
import MessageListItem from "./components/MessageListItem";
import Button from "@mui/material/Button";
import {MainRoutes} from "../MainRouter";
import {useHistory} from "react-router-dom";

const SentMessages = (): any => {
    const history = useHistory();
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
        <>
            <div style={{textAlign: "right"}}>
                <Button type="submit" onClick={_ => history.push(MainRoutes.newMessage())}>
                    Scrivi nuovo
                </Button>
                <Button type="submit" onClick={_ => history.push(MainRoutes.messages)}>
                    Messaggi ricevuti
                </Button>
            </div>
            <Suspense fallback={"Loading..."}>
                <List sx={{width: "100%", bgcolor: "background.paper"}}>
                    {messageList()}
                </List>
            </Suspense>
        </>
    );
}

export default SentMessages;
