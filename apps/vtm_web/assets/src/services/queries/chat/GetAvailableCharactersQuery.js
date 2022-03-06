// @flow

import type {
    GetAvailableCharactersQueryResponse,
    GetAvailableCharactersQueryVariables,
} from "./__generated__/GetAvailableCharactersQuery.graphql";
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";

import graphql from 'babel-plugin-relay/macro';

export const getAvailableCharactersQuery: Query<GetAvailableCharactersQueryVariables, GetAvailableCharactersQueryResponse> = graphql`
    query GetAvailableCharactersQuery {
        privateChatAvailableUsers {
            id
            name
        }
    }
`;
