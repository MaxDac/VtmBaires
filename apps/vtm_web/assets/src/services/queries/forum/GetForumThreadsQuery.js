// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getForumThreadsQuery: GraphQLTaggedNode = graphql`
    query GetForumThreadsQuery($forumSectionId: ID!) {
        getForumThreads(forumSectionId: $forumSectionId) {
            id
            forumSection {
                id
            }
            creatorUser {
                id
                name
            }
            creatorCharacter {
                id
                name
            }
            title
            description
            insertedAt
            updatedAt
        }
    }
`;
