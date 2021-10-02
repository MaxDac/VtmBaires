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
            }
            numberUnread
        }
    }
`;

const subscriptionObservable = (token: string): Observable<MessageNotificationSubscriptionResponse> =>
    wrapSubscription<MessageNotificationSubscriptionResponse>(
        subscription,
        { token },
        response => {console.log("response", response); return response; });

export default subscriptionObservable;
