// @flow

import React from "react";
import ReturnToMessagesControl from "./components/ReturnToMessagesControl";
import SendMessageMutation from "../../services/mutations/messages/SendMessageMutation";
import {useHistory} from "react-router-dom";
import {useRelayEnvironment} from "react-relay";
import {MainRoutes} from "../MainRouter";
import ReplyToMessage from "./components/ReplyToMessage";
import MessageTemplate from "./components/MessageTemplate";
import type {GenericReactComponent} from "../../_base/types";
import {useCustomSnackbar} from "../../_base/notification-utils";
import {useCharacterRecoilState} from "../../session/hooks";

export type SubmitProperties = {
    subject: string;
    text: string;
    onGame: boolean;
    characterId?: ?string;
    userId?: ?string;
};

type Props = {
    replyMessageId?: string;
    toUserId?: string;
    toCharacterId?: string;
}

const NewMessage = (props: Props): GenericReactComponent => {
    const environment = useRelayEnvironment()
    const history = useHistory()
    const {enqueueSnackbar} = useCustomSnackbar()
    const [character,] = useCharacterRecoilState()

    const onSubmit = (e: SubmitProperties) => {
        SendMessageMutation(environment, {
            onGame: e.onGame,
            receiverCharacterId: e.characterId,
            receiverUserId: e.userId,
            replyToId: props.replyMessageId,
            senderCharacterId: character?.id,
            subject: e.subject,
            text: e.text
        })
            .then(_ => enqueueSnackbar({
                type: "success",
                message: "Messaggio inviato correttamente"
            }))
            .catch(e => enqueueSnackbar({
                type: "error",
                graphqlError: e,
                message: "Errore inviando il messaggio!"
            }))
            .finally(() => history.push(MainRoutes.messages));
    };

    const editor = () =>
        props.replyMessageId != null
            ? (<ReplyToMessage messageId={props.replyMessageId}
                               onSubmit={onSubmit}
                               toUserId={props.toUserId}
                               toCharacterId={props.toCharacterId} />)
            : (<MessageTemplate submitted={onSubmit} 
                                toUserId={props.toUserId} 
                                toCharacterId={props.toCharacterId}
                                isReply={false} />);

    return (
        <ReturnToMessagesControl>
            {editor()}
        </ReturnToMessagesControl>
    );
}

export default NewMessage;
