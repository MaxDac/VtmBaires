// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {AttributesSlimQueryResponse} from "./__generated__/AttributesSlimQuery.graphql";

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

export default function useAttributesSlimQuery(): ?AttributesSlimQueryResponse {
    return useCustomLazyLoadQuery(attributesSlimQuery, {});
}
