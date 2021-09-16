// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import type {GetCharacterQuery, GetCharacterQueryResponse} from "./__generated__/GetCharacterQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

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

export function useCharacterQuery(characterId: string): GetCharacterQueryResponse {
    return useCustomLazyLoadQuery<GetCharacterQuery>(getCharacterQuery, { id: characterId });
}

// const queryPromise = (characterId: Id): Promise<Character> => {
//     return wrapQueryAuthorized<{ getCharacter: Character }>(query, {
//         id: characterId
//     })
//         .then(x => x.getCharacter);
// };
//
// export default queryPromise;
