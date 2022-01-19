// @flow

import React, {Suspense, useContext, useState} from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {userReceivedMessagesQuery} from "../../services/queries/messages/UserReceivedMessagesQuery";
import List from "@mui/material/List";
import type {UserReceivedMessagesQuery} from "../../services/queries/messages/__generated__/UserReceivedMessagesQuery.graphql";
import MessageListItem from "./components/MessageListItem";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import { MainRoutes } from "../MainRouter";
import ButtonGroup from "@mui/material/ButtonGroup";
import {UtilityContext} from "../../contexts";
import {handleMutation} from "../../_base/utils";
import DeleteAllReceivedMessagesMutation from "../../services/mutations/messages/DeleteAllReceivedMessagesMutation";
import {useRelayEnvironment} from "react-relay";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import type {GenericReactComponent} from "../../_base/types";

const ReceivedMessages = (): GenericReactComponent => {
    const theme = useTheme();
    const history = useHistory();
    const environment = useRelayEnvironment();
    const {openDialog, showUserNotification} = useContext(UtilityContext);
    const [fetchKey, setFetchKey] = useState(0);

    const messages = useCustomLazyLoadQuery<UserReceivedMessagesQuery>(userReceivedMessagesQuery, {}, {
        fetchPolicy: "store-and-network",
        fetchKey: fetchKey
    });

    const isSmall = useMediaQuery(theme.breakpoints.down("md"));

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

    const onDeleteAll = _ => {
        openDialog(
            "Cancella tutti i messaggi",
            "Sei sicuro di voler cancellare tutti i tuoi messaggi ricevuti?",
            () => {
                handleMutation(
                    () => DeleteAllReceivedMessagesMutation(environment),
                    showUserNotification,
                    {
                        successMessage: "I messaggi sono stati cancellati correttamente",
                        onCompleted: () => {
                            setFetchKey(p => p + 1);
                        }
                    });
            }
        )
    };

    const buttonType = () => isSmall ? "contained" : "outlined";

    return (
        <>
            <div style={{textAlign: "right", padding: "1rem"}}>
                <ButtonGroup>
                    <Button variant={buttonType()} onClick={_ => history.push(MainRoutes.newMessage())}>
                        Scrivi nuovo
                    </Button>
                    <Button variant={buttonType()} onClick={_ => history.push(MainRoutes.sentMessages)}>
                        Messaggi inviati
                    </Button>
                    <Button variant={buttonType()} onClick={onDeleteAll}>
                        Cancella tutti
                    </Button>
                </ButtonGroup>
            </div>
            <Suspense fallback={"Loading..."}>
                <List sx={{width: "100%", bgcolor: "background.paper"}}>
                    {messageList()}
                </List>
            </Suspense>
        </>
    );
}

export default ReceivedMessages;
