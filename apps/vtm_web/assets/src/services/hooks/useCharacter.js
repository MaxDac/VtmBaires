// @flow

import {useMemo, useState} from "react";
import characterQuery from "../queries/character/get-character-query";
import type {Character, Id} from "../queries/character/character-types";

const useCharacter = (characterId?: ?Id): ?Character => {
    const [character, setCharacter] = useState<?Character>(null);

    useMemo(() => {
        if (characterId != null) {
            characterQuery(characterId)
                .then(c => setCharacter(c))
                .catch(e => console.error("Error while retrieving the character", e));
        }
    }, [characterId]);

    return character;
}

export default useCharacter;
