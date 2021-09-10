// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapSubscriptionAuthorized} from "../../relay-utils";
import type { ChatEntry } from "./chat-queries";
import {Observable} from "relay-runtime";

const subscription = graphql`
    subscription chatSubscription($mapId: ID!) {
        newChatEntry(mapId: $mapId) {
            id
            text
            result
            characterId
            chatMapId
            characterName
        }
    }
`;

const subscriptionPromise = (mapId: string): Observable<ChatEntry> =>
    wrapSubscriptionAuthorized<ChatEntry>(subscription, { mapId });

export default subscriptionPromise;
