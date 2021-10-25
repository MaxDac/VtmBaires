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
    +user: ?{|
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
                creatorCharacter {
                    id
                    name
                }
                creatorUser {
                    id
                    name
                }
                title
                description
            }
            posts {
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
                insertedAt
                updatedAt
            }
        }
    }
`;
