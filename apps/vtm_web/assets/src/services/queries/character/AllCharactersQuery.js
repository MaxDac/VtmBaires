// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const allCharactersQuery: GraphQLTaggedNode = graphql`
    query AllCharactersQuery {
        charactersList {
            id
            name
        }
    }
`;
