// @flow

import React from "react";
import type {CharacterProviderBaseProps} from "./character-providers-types";
import {useCharacterProviderId} from "./character-providers-types";
import RemoteCharacterProvider from "./RemoteCharacterProvider";
import {getCharacterQuery} from "../../services/queries/character/GetCharacterQuery";
import type {
    GetCharacterQuery
} from "../../services/queries/character/__generated__/GetCharacterQuery.graphql";
import Typography from "@material-ui/core/Typography";
import {log} from "../../_base/utils";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";

type Props = CharacterProviderBaseProps & {
    children: any => any,
}

const CharacterFragmentProviderQuery = ({characterId, children}) => {
    const character =
        useCustomLazyLoadQuery<GetCharacterQuery>(getCharacterQuery, { id: characterId })?.getCharacter;

    if (character?.id != null) {
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
