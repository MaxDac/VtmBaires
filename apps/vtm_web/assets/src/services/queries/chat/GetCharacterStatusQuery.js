// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  GetCharacterStatusQueryResponse,
  GetCharacterStatusQueryVariables,
} from "./__generated__/GetCharacterStatusQuery.graphql";

export const GetCharacterStatusQuery: Query<GetCharacterStatusQueryVariables, GetCharacterStatusQueryResponse> = graphql`
    query GetCharacterStatusQuery($characterId: ID!) {
        getCharacterStatus(characterId: $characterId) {
            id
            bloodPotency
            hunger
            health
            damage
            aggravatedDamage
            willpower
            willpowerDamage
        }
    }
`;
