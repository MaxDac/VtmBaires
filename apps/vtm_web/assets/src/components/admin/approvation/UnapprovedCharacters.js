// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {AllUnapprovedCharactersQuery} from "../../../services/queries/character/__generated__/AllUnapprovedCharactersQuery.graphql";
import {allUnapprovedCharactersQuery} from "../../../services/queries/character/AllUnapprovedCharactersQuery";
import ShowCharactersComponent from "../_shared/ShowCharactersComponent";
import {useHistory} from "react-router-dom";
import {toNotNullArray} from "../../../_base/utils";
import {MainRoutes} from "../../MainRouter";

const UnapprovedCharacters = (): any => {
    const history = useHistory();
    const unapprovedCharacters = toNotNullArray(
        useCustomLazyLoadQuery<AllUnapprovedCharactersQuery>(allUnapprovedCharactersQuery, {}, {
            fetchPolicy: "network-only"
        })?.unapprovedCharactersList);

    const showCharacter = id => history.push(MainRoutes.characterDashboard(id))

    return (
        <ShowCharactersComponent characters={unapprovedCharacters}
                                 onCharacterSelected={showCharacter} />
    );
}

export default UnapprovedCharacters;
