// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapQueryAuthorized} from "../../relay-utils";
import type {Id} from "./character-types";

export type CharacterAvatar = {
    id: string;
    avatar: string;
}

export const query: any = graphql`
    query getCharacterAvatarQuery($id: ID!) {
        getCharacter(id: $id) {
            info {
                id
                avatar
            }
        }
    }
`;

const queryPromise = (characterId: string): Promise<string> => {
    const key = `character-${characterId}`;
    const avatar = localStorage.getItem(key);

    if (avatar && avatar !== "") {
        return Promise.resolve(avatar);
    }

    return wrapQueryAuthorized<{ getCharacter: { info: CharacterAvatar } }>(query, {
        id: characterId
    })
        .then(x => x.getCharacter.info.avatar);
};

export default queryPromise;
