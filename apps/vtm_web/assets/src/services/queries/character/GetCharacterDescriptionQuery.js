// @flow

import graphql from 'babel-plugin-relay/macro';
import type {
  GetCharacterDescriptionQueryResponse,
  GetCharacterDescriptionQueryVariables,
} from "./__generated__/GetCharacterDescriptionQuery.graphql";
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";

export const getCharacterDescriptionQuery: Query<GetCharacterDescriptionQueryVariables, GetCharacterDescriptionQueryResponse> = graphql`
    query GetCharacterDescriptionQuery($id: ID!) {
        getCharacterDescription(characterId: $id) {
            id
            name
            avatar
            description
        }
    }
`;
