// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  GetChatEntriesQueryResponse,
  GetChatEntriesQueryVariables,
} from "./__generated__/GetChatEntriesQuery.graphql";

export const chatEntriesQuery: Query<GetChatEntriesQueryVariables, GetChatEntriesQueryResponse> = graphql`
    query GetChatEntriesQuery($mapId: ID!) {
        mapChatEntries(mapId: $mapId) {
            id
            character {
                id
                name
            }
            chatMap {
                id
            }
            master
            result
            text
            offGame
            insertedAt
        }
    }
`;
