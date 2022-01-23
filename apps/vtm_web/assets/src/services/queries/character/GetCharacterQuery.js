// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  GetCharacterQueryResponse,
  GetCharacterQueryVariables,
} from "./__generated__/GetCharacterQuery.graphql";

export const getCharacterQuery: Query<GetCharacterQueryVariables, GetCharacterQueryResponse> = graphql`
    query GetCharacterQuery($id: ID!) {
        getCharacter(id: $id) {
            id,
            ...CharacterFragments_characterInfo
            ...CharacterFragments_characterConcealedInfo
            ...CharacterFragments_characterSheet
            ...CharacterFragments_characterStats
            ...CharacterFragments_characterState
            ...CharacterFragments_characterOff
        }
    }
`;
