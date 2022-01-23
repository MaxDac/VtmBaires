// @flow

import type {
  AllUsersQueryResponse,
  AllUsersQueryVariables,
} from "./__generated__/AllUsersQuery.graphql";

import type { Query } from "relay-runtime/util/RelayRuntimeTypes";

import graphql from 'babel-plugin-relay/macro';

export const allUsersQuery: Query<AllUsersQueryVariables, AllUsersQueryResponse> = graphql`
    query AllUsersQuery {
        allUsers {
            id
            name
        }
    }
`;
