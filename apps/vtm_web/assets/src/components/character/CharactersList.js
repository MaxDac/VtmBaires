// @flow

import React from "react";
import {useForceReloadFirstQuery} from "../../_base/relay-utils";
import {allCharactersQuery} from "../../services/queries/character/AllCharactersQuery";
import type {AllCharactersQuery} from "../../services/queries/character/__generated__/AllCharactersQuery.graphql";
import ShowCharactersComponent from "./ShowCharactersComponent";
import { filterNulls, toArray } from "../../_base/utils";

const CharactersList = (): any => {
    const characters = filterNulls(toArray(
        useForceReloadFirstQuery<AllCharactersQuery>(allCharactersQuery, {})
            ?.charactersList));

    const showComponent = () => {
        if (characters != null) {
            return <ShowCharactersComponent characters={characters} />
        }

        return (<></>);
    }

    return showComponent();
}

export default CharactersList;
