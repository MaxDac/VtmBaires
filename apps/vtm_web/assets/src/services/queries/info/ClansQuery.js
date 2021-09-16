// @flow

import graphql from 'babel-plugin-relay/macro'
import type {GraphQLTaggedNode} from "relay-runtime";

export const clansQuery: GraphQLTaggedNode = graphql`
    query ClansQuery {
        clans {
            id
            name
        }
    }
`;
