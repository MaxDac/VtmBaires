// @flow

import React from "react";
import type {CharacterProviderBaseProps} from "./character-providers-types";
import {useCharacterProviderId} from "./character-providers-types";
import RemoteCharacterProvider from "./RemoteCharacterProvider";
import {useCharacterQuery} from "../../services/queries/character/GetCharacterQuery";
import type {GetCharacterQueryResponse} from "../../services/queries/character/__generated__/GetCharacterQuery.graphql";
import Typography from "@material-ui/core/Typography";

type Props = CharacterProviderBaseProps & {
    children: GetCharacterQueryResponse => any,
}

const CharacterFragmentProviderQuery = ({characterId, children}) => {
    const character = useCharacterQuery(characterId);

    if (character?.getCharacter?.id != null) {
        return children(character);
    }

    return (
        <Typography>
            Test 1
        </Typography>
    );
}

const CharacterFragmentProvider = (props: Props): any => {
    const characterId = useCharacterProviderId(props.characterId);

    if (characterId != null) {
        return (
            <CharacterFragmentProviderQuery characterId={characterId}>
                {props.children}
            </CharacterFragmentProviderQuery>
        );
    }

    return (
        <RemoteCharacterProvider>
            { characterId =>
                <CharacterFragmentProviderQuery characterId={characterId} children={props.children} />
            }
        </RemoteCharacterProvider>
    );
}

export default CharacterFragmentProvider;
