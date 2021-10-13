// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const GetCharacterStatusQuery: GraphQLTaggedNode = graphql`
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
