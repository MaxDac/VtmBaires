// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getCharacterQuery: GraphQLTaggedNode = graphql`
    query GetCharacterQuery($id: ID!) {
        getCharacter(id: $id) {
            id,
            ...CharacterFragments_characterAvatar
            ...CharacterFragments_characterInfo
            ...CharacterFragments_characterSheet
            ...CharacterFragments_characterStats
            ...CharacterFragments_characterState
        }
    }
`;

// const queryPromise = (characterId: Id): Promise<Character> => {
//     return wrapQueryAuthorized<{ getCharacter: Character }>(query, {
//         id: characterId
//     })
//         .then(x => x.getCharacter);
// };
//
// export default queryPromise;
