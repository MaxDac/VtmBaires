// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {allUnapprovedCharactersQuery} from "../../../services/queries/character/AllUnapprovedCharactersQuery";
import ShowCharactersComponent from "../../character/ShowCharactersComponent";
import {
  emptyExactObject,
  readonlyFilterNulls,
} from "../../../_base/utils";
import type {GenericReactComponent} from "../../../_base/types";

const UnapprovedCharacters = (): GenericReactComponent => {
    const unapprovedCharacters = readonlyFilterNulls(
        useCustomLazyLoadQuery(allUnapprovedCharactersQuery, emptyExactObject(), {
            fetchPolicy: "network-only"
        })?.unapprovedCharactersList);

    return (
        <ShowCharactersComponent characters={unapprovedCharacters} />
    );
}

export default UnapprovedCharacters;
