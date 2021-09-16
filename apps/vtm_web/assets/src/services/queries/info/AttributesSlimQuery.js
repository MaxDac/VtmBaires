// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import type {AttributeSections, AttributeTypeNames} from "./AttributesQuery";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

export const attributesSlimQuery: GraphQLTaggedNode = graphql`
    query AttributesSlimQuery {
        attributes {
            id
            name
            attributeType {
                name
                section
            }
        }
    }
`;

export type AttributeSlimType = {
    name: AttributeTypeNames;
    section: AttributeSections;
}

export type AttributeSlim = {
    id: string;
    name: string;
    description?: ?string;
    attributeType: AttributeSlimType
}

export default function useAttributesSlimQuery(): ?Array<AttributeSlim> {
    return useCustomLazyLoadQuery(attributesSlimQuery, {});
}
