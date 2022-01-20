// @flow

import React, {useContext} from "react";
import ReturnToMessagesControl from "./components/ReturnToMessagesControl";
import SendMessageMutation from "../../services/mutations/messages/SendMessageMutation";
import {useSession} from "../../services/session-service";
import {UtilityContext} from "../../contexts";
import {useHistory} from "react-router-dom";
import {useRelayEnvironment} from "react-relay";
import { MainRoutes } from "../MainRouter";
import ReplyToMessage from "./components/ReplyToMessage";
import MessageTemplate from "./components/MessageTemplate";
import type {GenericReactComponent} from "../../_base/types";

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
    const environment = useRelayEnvironment();
    const history = useHistory();
    const {showUserNotification} = useContext(UtilityContext);
    const [,character] = useSession();

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
            .then(_ => showUserNotification({
                type: "success",
                message: "Messaggio inviato correttamente"
            }))
            .catch(e => showUserNotification({
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
