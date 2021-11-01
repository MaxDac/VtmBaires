// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getForumPostQuery: GraphQLTaggedNode = graphql`
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
