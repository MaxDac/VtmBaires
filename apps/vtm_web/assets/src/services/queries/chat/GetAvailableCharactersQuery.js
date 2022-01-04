// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getAvailableCharactersQuery: GraphQLTaggedNode = graphql`
    query GetAvailableCharactersQuery {
        privateChatAvailableUsers {
            id
            name
        }
    }
`;
