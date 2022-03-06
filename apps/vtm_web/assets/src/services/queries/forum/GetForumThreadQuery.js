// @flow

import graphql from 'babel-plugin-relay/macro';
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {
    GetForumThreadQueryResponse,
    GetForumThreadQueryVariables,
} from "./__generated__/GetForumThreadQuery.graphql";

export const getForumThreadQuery: Query<GetForumThreadQueryVariables, GetForumThreadQueryResponse> = graphql`
    query GetForumThreadQuery($forumThreadId: ID!) {
        getForumThread(id: $forumThreadId) {
            id @required(action: LOG)
            forumSection {
                id
            }
            creatorCharacter {
                id
                name
            }
            creatorUser {
                id
                name
            }
            allowedCharacters {
                id @required(action: LOG)
                name
            }
            onGame
            postCount
            title
            description
            highlighted
        }
    }
`;
