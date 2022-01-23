// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  GetForumPostQueryResponse,
  GetForumPostQueryVariables,
} from "./__generated__/GetForumPostQuery.graphql";

export const getForumPostQuery: Query<GetForumPostQueryVariables, GetForumPostQueryResponse> = graphql`
    query GetForumPostQuery($id: ID!) {
        getForumPost(id: $id) {
            id
            text
            character {
                id
                name
            }
            user {
                id
                name
            }
            onGame
        }
    }
`;
