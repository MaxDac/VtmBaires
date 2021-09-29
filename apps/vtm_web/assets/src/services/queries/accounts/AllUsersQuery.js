// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const allUsersQuery: GraphQLTaggedNode = graphql`
    query AllUsersQuery {
        allUsers {
            id
            name
        }
    }
`;
