// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapSubscription} from "../../_base/relay-utils";
import {Observable} from "relay-runtime";
import type {ChatEntry} from "../base-types";

const subscription = graphql`
    subscription ChatSubscription($mapId: ID!, $token: String!) {
        newChatEntry(mapId: $mapId, token: $token) {
            id
            text
            result
            master
            character {
                id
                name
                chatAvatar
            }
            chatMap {
                id
            }
            insertedAt
        }
    }
`;

const subscriptionObservable = (mapId: string, token: string): Observable<ChatEntry> =>
    wrapSubscription<ChatEntry>(subscription, { mapId, token }, ({ newChatEntry }) => newChatEntry);

export default subscriptionObservable;
