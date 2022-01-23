// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {
  AllUnapprovedCharactersQueryResponse,
  AllUnapprovedCharactersQueryVariables,
} from "../../../services/queries/character/__generated__/AllUnapprovedCharactersQuery.graphql";
import {allUnapprovedCharactersQuery} from "../../../services/queries/character/AllUnapprovedCharactersQuery";
import ShowCharactersComponent from "../../character/ShowCharactersComponent";
import { emptyExactObject, toNotNullArray } from "../../../_base/utils";
import type {GenericReactComponent} from "../../../_base/types";

const UnapprovedCharacters = (): GenericReactComponent => {
    const unapprovedCharacters = toNotNullArray(
        useCustomLazyLoadQuery<AllUnapprovedCharactersQueryVariables, AllUnapprovedCharactersQueryResponse>(allUnapprovedCharactersQuery, emptyExactObject(), {
            fetchPolicy: "network-only"
        })?.unapprovedCharactersList);

    return (
        <ShowCharactersComponent characters={unapprovedCharacters} />
    );
}

export default UnapprovedCharacters;
