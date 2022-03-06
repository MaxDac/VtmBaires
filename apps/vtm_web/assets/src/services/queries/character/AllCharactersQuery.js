// @flow

import graphql from 'babel-plugin-relay/macro';
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {
    AllCharactersQueryResponse,
    AllCharactersQueryVariables,
} from "./__generated__/AllCharactersQuery.graphql";

export const allCharactersQuery: Query<AllCharactersQueryVariables, AllCharactersQueryResponse> = graphql`
    query AllCharactersQuery {
        charactersList {
            id
            name
            user {
                id
            }
        }
    }
`;
