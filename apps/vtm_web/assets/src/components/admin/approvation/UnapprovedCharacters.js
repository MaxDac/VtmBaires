// @flow

import React from "react";
import MainLayout from "../../MainLayout";
import {useForceReloadFirstQuery} from "../../../_base/relay-utils";
import type {AllUnapprovedCharactersQuery} from "../../../services/queries/character/__generated__/AllUnapprovedCharactersQuery.graphql";
import {allUnapprovedCharactersQuery} from "../../../services/queries/character/AllUnapprovedCharactersQuery";
import ShowCharactersComponent from "../_shared/ShowCharactersComponent";

const UnapprovedCharacters = (): any => {
    const unapprovedCharacters =
        useForceReloadFirstQuery<AllUnapprovedCharactersQuery>(allUnapprovedCharactersQuery, {})
            ?.unapprovedCharactersList ?? [];

    const showCharacter = id => {
        console.log("selected character", id);
    };

    return (
        <MainLayout>
            <ShowCharactersComponent characters={unapprovedCharacters}
                                     onCharacterSelected={showCharacter} />
        </MainLayout>
    );
}

export default UnapprovedCharacters;
