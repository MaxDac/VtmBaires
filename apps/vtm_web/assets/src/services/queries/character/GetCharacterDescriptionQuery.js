// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {wrapQuery} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";

export const getCharacterDescriptionQuery: GraphQLTaggedNode = graphql`
    query GetCharacterDescriptionQuery($id: ID!) {
        getCharacter(id: $id) {
            id
            name
            description
        }
    }
`;

export type CharacterDescription = {
    id: string;
    name: string;
    description: string;
};

export const getCharacterDescription = (environment: IEnvironment, id: string): Promise<?CharacterDescription> =>
    wrapQuery<CharacterDescription>(environment, getCharacterDescriptionQuery, {
        id
    }, res => res?.getCharacter);
