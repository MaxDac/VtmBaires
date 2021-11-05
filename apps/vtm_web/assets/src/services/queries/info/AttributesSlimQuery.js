// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import { attributesDefaultSortFunction } from "./AttributesQuery";
import type {
  Attribute,
  AttributeSections,
  AttributeTypeNames,
} from "./AttributesQuery";

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

export default function useAttributesSlimQuery(): ?Array<Attribute> {
    return useCustomLazyLoadQuery(attributesSlimQuery, {})
        ?.attributes
        ?.map(a => ({
            id: a?.id ?? "",
            name: a?.name ?? "",
            attributeType: {
                name: ((a?.attributeType?.name ?? "Attribute": any): AttributeTypeNames),
                section: ((a?.attributeType?.section ?? "Physical": any): AttributeSections)
            }
        }))
        ?.sort((a, b) => attributesDefaultSortFunction(a, b));
}
