// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export type Post = {
    +id: string,
    +text: ?string,
    +creatorName: ?string,
    +creatorAvatar: ?string,
    +insertedAt: ?any,
    +updatedAt: ?any,
};

export const getForumThreadQuery: GraphQLTaggedNode = graphql`
    query GetForumThreadQuery($forumThreadId: ID!) {
        getForumThread(id: $forumThreadId) {
            thread {
                id
                forumSection {
                    id
                }
                title
                description
                creatorName
            }
            posts {
                id
                text
                creatorName
                creatorAvatar
                insertedAt
                updatedAt
            }
        }
    }
`;
