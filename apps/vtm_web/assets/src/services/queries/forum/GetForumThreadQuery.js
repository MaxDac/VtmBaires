// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export type Post = {
    +id: string,
    +text: ?string,
    +character: ?{|
        +id: ?string,
        +name: ?string
    |},
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
                character {
                    id
                    name
                }
                insertedAt
                updatedAt
            }
        }
    }
`;
