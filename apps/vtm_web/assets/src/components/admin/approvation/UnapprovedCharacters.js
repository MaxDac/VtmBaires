// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {AllUnapprovedCharactersQuery} from "../../../services/queries/character/__generated__/AllUnapprovedCharactersQuery.graphql";
import {allUnapprovedCharactersQuery} from "../../../services/queries/character/AllUnapprovedCharactersQuery";
import ShowCharactersComponent from "../../character/ShowCharactersComponent";
import {toNotNullArray} from "../../../_base/utils";

const UnapprovedCharacters = (): any => {
    const unapprovedCharacters = toNotNullArray(
        useCustomLazyLoadQuery<AllUnapprovedCharactersQuery>(allUnapprovedCharactersQuery, {}, {
            fetchPolicy: "network-only"
        })?.unapprovedCharactersList);

    return (
        <ShowCharactersComponent characters={unapprovedCharacters} />
    );
}

export default UnapprovedCharacters;
