// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

export type AttributeTypeNames = "Attribute" | "Ability" | "Advantage" | "Discipline";

export type AttributeSections = "Physical" | "Social" | "Mental";

export type AttributeType = {
    id: string;
    name: AttributeTypeNames;
    section: AttributeSections;
}

export type Attribute = {
    id: string;
    name: string;
    description?: ?string;
    attributeType: AttributeType
}

export const attributesQuery: any = graphql`
    query AttributesQuery {
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

export default function useAttributesQuery(): ?Array<Attribute> {
    return useCustomLazyLoadQuery(attributesQuery, {})?.attributes;
}
