// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getForumThreadsQuery: GraphQLTaggedNode = graphql`
    query GetForumThreadsQuery($forumSectionId: ID!, $pageSize: Int!, $page: Int!) {
        getForumThreads(forumSectionId: $forumSectionId, pageSize: $pageSize, page: $page) {
            threadCount
            threads {
                thread {
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
                lastPostUpdatedAt
                hasNewPosts
            }
        }
    }
`;
