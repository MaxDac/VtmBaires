// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {getCharacterPublicQuery} from "../../services/queries/character/GetCharacterPublicQuery";
import type {GenericReactComponent} from "../../_base/types";

type Props = {
    id: string;
    children: any => any;
    reload?: boolean;
    fetchKey?: number;
}

const CharacterFragmentPublicProviderQuery = ({id, children, reload, fetchKey}: Props): GenericReactComponent => {
    const policy = {
        fetchPolicy: reload ? "store-and-network" : "store-or-network",
        fetchKey: fetchKey ?? 0
    };

    const character =
        useCustomLazyLoadQuery(getCharacterPublicQuery, { id: id }, policy)
            ?.getCharacterPublicInfo;

    if (character?.id != null) {
        return children(character);
    }

    return (
        <></>
    );
};

export default CharacterFragmentPublicProviderQuery;
