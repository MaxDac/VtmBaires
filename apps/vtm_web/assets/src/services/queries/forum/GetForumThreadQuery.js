// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getForumThreadQuery: GraphQLTaggedNode = graphql`
    query GetForumThreadQuery($forumThreadId: ID!) {
        getForumThread(id: $forumThreadId) {
            id
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
            onGame
            postCount
            title
            description
        }
    }
`;
