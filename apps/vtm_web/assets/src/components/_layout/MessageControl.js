// @flow

import React, {useContext, useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ForumIcon from "@mui/icons-material/Forum";
import {useHistory} from "react-router-dom";
import {UtilityContext} from "../../contexts";
import {subscribe, useCustomLazyLoadQuery} from "../../_base/relay-utils";
import type {GetMessageDigestQuery} from "../../services/queries/messages/__generated__/GetMessageDigestQuery.graphql";
import {getMessageDigestQuery} from "../../services/queries/messages/GetMessageDigestQuery";
import useSubscriptionTokenQuery from "../../services/queries/accounts/SubscriptionTokenQuery";
import type {MessageNotificationSubscriptionResponse} from "../../services/subscriptions/__generated__/MessageNotificationSubscription.graphql";
import MessageNotificationSubscription from "../../services/subscriptions/MessageNotificationSubscription";
import {MainRoutes} from "../MainRouter";
import Tooltip from '@mui/material/Tooltip';

type Props = {

}

const MessageControl = (props: Props): any => {
    const history = useHistory();
    const {showUserNotification} = useContext(UtilityContext);

    const messagesDigest = useCustomLazyLoadQuery<GetMessageDigestQuery>(getMessageDigestQuery, {}, {
        fetchPolicy: "store-and-network"
    });

    const [numberOfMessages, setNumberOfMessages] = useState(messagesDigest?.messagesDigest?.unreadMessages ?? 0);

    // Message notification subscription
    const chatToken = useSubscriptionTokenQuery();

    useEffect(() => {
        const handleNotification = (notification: MessageNotificationSubscriptionResponse) => {
            if (notification?.newMessageNotification?.message != null) {
                const message = notification.newMessageNotification.message
                showUserNotification({
                    type: "info",
                    message: message.senderName != null
                        ?`${message.senderName}: ${message.subject}`
                        : message.subject
                });
            }
        }

        const handleMessageBadgeUpdate = (notification: MessageNotificationSubscriptionResponse) => {
            if (notification?.newMessageNotification?.numberUnread != null) {
                setNumberOfMessages(notification.newMessageNotification.numberUnread);
            }
        }

        subscribe(MessageNotificationSubscription(chatToken), notification => {
            handleNotification(notification);
            handleMessageBadgeUpdate(notification);
        });
    }, [showUserNotification, chatToken]);

    return (
        <Tooltip title="Messaggi" placement="bottom">
            <IconButton aria-label="messages" onClick={_ => history.push(MainRoutes.messages)}>
                <Badge badgeContent={numberOfMessages} color="secondary">
                    <ForumIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    );
}

export default MessageControl;
