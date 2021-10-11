// @flow

import React from "react";
import type {CharacterProviderBaseProps} from "./character-providers-types";
import {useCharacterProviderId} from "./character-providers-types";
import RemoteCharacterProvider from "./RemoteCharacterProvider";
import {getCharacterQuery} from "../../services/queries/character/GetCharacterQuery";
import type {
    GetCharacterQuery
} from "../../services/queries/character/__generated__/GetCharacterQuery.graphql";
import Typography from "@mui/material/Typography";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";

type Props = CharacterProviderBaseProps & {
    children: any => any;
    reload?: ?boolean;
}

const CharacterFragmentProviderQuery = ({characterId, children, reload}) => {
    const policy = {
        fetchPolicy: reload ? "store-and-network" : "store-or-network",
    };

    const character =
        useCustomLazyLoadQuery<GetCharacterQuery>(getCharacterQuery, { id: characterId }, policy)
            ?.getCharacter;

    if (character?.id != null) {
        return children(character);
    }

    return (
        <Typography>
            Test 2
        </Typography>
    );
}

const CharacterFragmentProvider = (props: Props): any => {
    const characterId = useCharacterProviderId(props.characterId);

    if (characterId != null) {
        return (
            <CharacterFragmentProviderQuery characterId={characterId} reload={props.reload}>
                {props.children}
            </CharacterFragmentProviderQuery>
        );
    }

    return (
        <RemoteCharacterProvider>
            { characterId =>
                <CharacterFragmentProviderQuery characterId={characterId} children={props.children} reload={props.reload} />
            }
        </RemoteCharacterProvider>
    );
}

export default CharacterFragmentProvider;
