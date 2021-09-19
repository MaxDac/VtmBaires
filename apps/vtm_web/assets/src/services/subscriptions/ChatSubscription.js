// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapSubscription} from "../../_base/relay-utils";
import {Observable} from "relay-runtime";
import type {ChatEntry} from "../base-types";

const subscription = graphql`
    subscription ChatSubscription($mapId: ID!) {
        newChatEntry(mapId: $mapId) {
            id
            text
            result
            master
            characterId
            characterChatAvatar
            chatMapId
            characterName
        }
    }
`;

const subscriptionPromise = (mapId: string): Observable<ChatEntry> =>
    wrapSubscription<ChatEntry>(subscription, { mapId }, ({ newChatEntry }) => newChatEntry);

export default subscriptionPromise;
