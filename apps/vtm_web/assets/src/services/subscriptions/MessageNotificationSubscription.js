// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapSubscription} from "../../_base/relay-utils";
import {Observable} from "relay-runtime";
import type {MessageNotificationSubscriptionResponse} from "./__generated__/MessageNotificationSubscription.graphql";

const subscription = graphql`
    subscription MessageNotificationSubscription($token: String!) {
        newMessageNotification(token: $token) {
            message {
                id
                subject
                senderName
                operation
            }
            numberUnread
        }
    }
`;

const subscriptionObservable = (token: string): Observable<MessageNotificationSubscriptionResponse> =>
    wrapSubscription<MessageNotificationSubscriptionResponse>(subscription, {
        token
    });

export default subscriptionObservable;
