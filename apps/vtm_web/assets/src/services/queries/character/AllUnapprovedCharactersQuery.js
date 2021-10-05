// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const allUnapprovedCharactersQuery: GraphQLTaggedNode = graphql`
    query AllUnapprovedCharactersQuery {
        unapprovedCharactersList {
            id
            name
        }
    }
`;
