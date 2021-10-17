// @flow

import React from "react";
import {useForceReloadFirstQuery} from "../../../_base/relay-utils";
import {allCharactersQuery} from "../../../services/queries/character/AllCharactersQuery";
import type {AllCharactersQuery} from "../../../services/queries/character/__generated__/AllCharactersQuery.graphql";
import {useHistory} from "react-router-dom";
import {Routes} from "../../../AppRouter";
import MainLayout from "../../MainLayout";
import ShowCharactersComponent from "../_shared/ShowCharactersComponent";
import { filterNulls, toArray } from "../../../_base/utils";

const CharactersList = (): any => {
    const history = useHistory();
    const characters = filterNulls(toArray(
        useForceReloadFirstQuery<AllCharactersQuery>(allCharactersQuery, {})
            ?.charactersList));

    const showCharacter = id => history.push(Routes.characterDashboard(id));

    const showComponent = () => {
        if (characters != null) {
            <ShowCharactersComponent characters={characters}
                                     onCharacterSelected={showCharacter} />
        }

        return (<></>);
    }

    return (
        <MainLayout>
            {showComponent()}
        </MainLayout>
    );
}

export default CharactersList;
