// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapQueryAuthorized} from "../../relay-utils";
import type {Character, Id} from "./character-types";

export const query: any = graphql`
    query getCharacterStageQuery($id: ID!) {
        getCharacter(id: $id) {
            info {
                id
            }
            stage
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
