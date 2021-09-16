// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

export const getCharacterCompleteQuery: GraphQLTaggedNode = graphql`
    query GetCharacterCompleteQuery($id: ID!) {
        getCharacter(id: $id) {
            ...CharacterFragments_characterInfo @relay(mask: false)
            ...CharacterFragments_characterSheet @relay(mask: false)
            ...CharacterFragments_characterStats @relay(mask: false)
            ...CharacterFragments_characterState @relay(mask: false)
            ...CharacterFragments_characterAvatar
        }
    }
`;

export type Character = {|
    +id: string,
    +name: ?string,
    +chatAvatar: ?string,
    +clan: ?{|
        +id: string,
        +name: ?string,
    |},
    +biography: ?string,
    +description: ?string,
    +humanity: ?number,
    +experience: ?number,
    +generation: ?number,
    +hunger: ?number,
    +health: ?number,
    +damage: ?number,
    +aggravatedDamage: ?number,
    +willpower: ?number,
    +willpowerDamage: ?number,
    +stage: ?number,
    +approved: ?boolean,
    +isComplete: ?boolean,
    +isNpc: ?boolean,
    +advantages: ?string,
    +notes: ?string,
|};

export function useCharacterCompleteQuery(characterId: string): ?Character {
    return useCustomLazyLoadQuery(getCharacterCompleteQuery, { id: characterId })?.getCharacter;
}

// const queryPromise = (characterId: Id): Promise<Character> => {
//     return wrapQueryAuthorized<{ getCharacter: Character }>(query, {
//         id: characterId
//     })
//         .then(x => x.getCharacter);
// };
//
// export default queryPromise;
