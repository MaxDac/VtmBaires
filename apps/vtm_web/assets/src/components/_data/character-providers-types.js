// @flow

import {useContext} from "react";
import {SessionContext} from "../../App";

export type CharacterProviderBaseProps = {
    characterId?: ?string;
}

export const useCharacterProviderId = (characterId: ?string): ?string => {
    const {getCharacter} = useContext(SessionContext);
    const c = getCharacter();

    if (characterId != null) {
        return characterId;
    }

    if (c?.id != null) {
        return c.id;
    }

    return null;
}
