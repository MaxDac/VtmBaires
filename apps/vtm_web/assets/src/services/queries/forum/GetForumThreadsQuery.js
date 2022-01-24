// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  GetForumThreadsQueryResponse,
  GetForumThreadsQueryVariables,
} from "./__generated__/GetForumThreadsQuery.graphql";

export const getForumThreadsQuery: Query<GetForumThreadsQueryVariables, GetForumThreadsQueryResponse> = graphql`
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
                    highlighted
                    insertedAt
                    updatedAt
                }
                lastPostUpdatedAt
                hasNewPosts
            }
        }
    }
`;
