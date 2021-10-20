// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const chatEntriesQuery: GraphQLTaggedNode = graphql`
    query GetChatEntriesQuery($mapId: ID!) {
        mapChatEntries(mapId: $mapId) {
            id
            character {
                id
                name
                chatAvatar
            }
            chatMap {
                id
            }
            master
            result
            text
            insertedAt
        }
    }
`;
