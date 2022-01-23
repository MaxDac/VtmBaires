// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  GetCharacterUserQueryResponse,
  GetCharacterUserQueryVariables,
} from "./__generated__/GetCharacterUserQuery.graphql";

export const getCharacterUserQuery: Query<GetCharacterUserQueryVariables, GetCharacterUserQueryResponse> = graphql`
    query GetCharacterUserQuery($characterId: ID!) {
        getCharacterUser(characterId: $characterId) {
            id
            name
            role
        }
    }
`;
