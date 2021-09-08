// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapQuery } from "../../relay-utils";

import type {Id} from "../character/character-types";
import {loadQuery} from "react-relay";
import environment from "../../../_base/relay-environment";

export type AttributeTypeNames = "Attribute" | "Ability" | "Advantage" | "Discipline";

export type AttributeSections = "Physical" | "Social" | "Mental";

export type AttributeType = {
    id: Id;
    name: AttributeTypeNames;
    section: AttributeSections;
}

export type Attribute = {
    id: Id;
    name: string;
    description?: ?string;
    attributeType: AttributeType
}

export const attributesQuery: any = graphql`
    query attributesQuery {
        attributes {
            id
            name
            description
            attributeType {
                id
                name
                section
            }
        }
    }
`;

export const preloadedQuery: any = loadQuery(environment, attributesQuery, {});

const exp = (): Promise<Attribute[]> =>
    wrapQuery(attributesQuery, {})
        .then(({attributes}) => attributes);

export default exp;
