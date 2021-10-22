// @flow

import React from "react";
import {useForceReloadFirstQuery} from "../../../_base/relay-utils";
import {allCharactersQuery} from "../../../services/queries/character/AllCharactersQuery";
import type {AllCharactersQuery} from "../../../services/queries/character/__generated__/AllCharactersQuery.graphql";
import {useHistory} from "react-router-dom";
import ShowCharactersComponent from "../_shared/ShowCharactersComponent";
import { filterNulls, toArray } from "../../../_base/utils";
import { MainRoutes } from "../../MainRouter";

const CharactersList = (): any => {
    const history = useHistory();
    const characters = filterNulls(toArray(
        useForceReloadFirstQuery<AllCharactersQuery>(allCharactersQuery, {})
            ?.charactersList));

    const showCharacter = id => history.push(MainRoutes.characterDashboard(id));

    const showComponent = () => {
        if (characters != null) {
            return <ShowCharactersComponent characters={characters}
                                            onCharacterSelected={showCharacter} />
        }

        return (<></>);
    }

    return showComponent();
}

export default CharactersList;
