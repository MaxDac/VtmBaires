// @flow

import {useCharacterRecoilState} from "../../session/hooks";

export type CharacterProviderBaseProps = {
    characterId?: ?string;
}

export const useCharacterProviderId = (characterId: ?string): ?string => {
    const [character,] = useCharacterRecoilState()

    if (characterId != null) {
        return characterId;
    }

    if (character?.id != null) {
        return character.id;
    }

    return null;
}
