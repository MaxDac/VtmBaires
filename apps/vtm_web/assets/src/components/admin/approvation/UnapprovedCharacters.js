// @flow

import React from "react";
import MainLayout from "../../MainLayout";
import {useForceReloadFirstQuery} from "../../../_base/relay-utils";
import type {AllUnapprovedCharactersQuery} from "../../../services/queries/character/__generated__/AllUnapprovedCharactersQuery.graphql";
import {allUnapprovedCharactersQuery} from "../../../services/queries/character/AllUnapprovedCharactersQuery";
import ShowCharactersComponent from "../_shared/ShowCharactersComponent";
import {useHistory} from "react-router-dom";
import {Routes} from "../../../AppRouter";

const UnapprovedCharacters = (): any => {
    const history = useHistory();
    const unapprovedCharacters =
        useForceReloadFirstQuery<AllUnapprovedCharactersQuery>(allUnapprovedCharactersQuery, {})
            ?.unapprovedCharactersList ?? [];

    const showCharacter = id => history.push(Routes.characterDashboard(id))

    return (
        <MainLayout>
            <ShowCharactersComponent characters={unapprovedCharacters}
                                     onCharacterSelected={showCharacter} />
        </MainLayout>
    );
}

export default UnapprovedCharacters;
