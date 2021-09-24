// @flow

import {useSession} from "../../services/session-service";

export type CharacterProviderBaseProps = {
    characterId?: ?string;
}

export const useCharacterProviderId = (characterId: ?string): ?string => {
    const [,character] = useSession();

    if (characterId != null) {
        return characterId;
    }

    if (character?.id != null) {
        return character.id;
    }

    return null;
}
