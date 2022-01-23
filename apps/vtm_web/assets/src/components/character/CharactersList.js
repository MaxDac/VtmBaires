// @flow

import React from "react";
import {allCharactersQuery} from "../../services/queries/character/AllCharactersQuery";
import ShowCharactersComponent from "./ShowCharactersComponent";
import {
  emptyExactObject,
  toNotNullArray,
} from "../../_base/utils";
import type {GenericReactComponent} from "../../_base/types";
import { useCustomLazyLoadQuery } from "../../_base/relay-utils";

const CharactersList = (): GenericReactComponent => {
    const characters = toNotNullArray(
        useCustomLazyLoadQuery(allCharactersQuery, emptyExactObject(), {
            fetchPolicy: "store-and-network"
        })?.charactersList);

    const showComponent = () => {
        if (characters != null) {
            return <ShowCharactersComponent characters={characters} />
        }

        return (<></>);
    }

    return showComponent();
}

export default CharactersList;
