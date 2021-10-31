// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const creationClansQuery: GraphQLTaggedNode = graphql`
    query CreationClansQuery {
        creationClans {
            id
            name
        }
    }
`;
