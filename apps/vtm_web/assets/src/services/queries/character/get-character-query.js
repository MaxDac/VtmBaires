// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapQueryAuthorized} from "../../relay-utils";
import type {Character, Id} from "./character-types";

export const query: any = graphql`
    query getCharacterQuery($id: ID!) {
        getCharacter(id: $id) {
            ...characterFragments_characterInfo @relay(mask: false)
            ...characterFragments_characterSheet @relay(mask: false)
            ...characterFragments_characterStats @relay(mask: false)
            ...characterFragments_characterState @relay(mask: false)
        }
    }
`;

const queryPromise = (characterId: Id): Promise<Character> => {
    return wrapQueryAuthorized<{ getCharacter: Character }>(query, {
        id: characterId
    })
        .then(x => x.getCharacter);
};

export default queryPromise;
