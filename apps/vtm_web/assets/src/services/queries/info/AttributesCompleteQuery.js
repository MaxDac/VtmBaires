// @flow

import graphql from 'babel-plugin-relay/macro';
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {
    AttributesCompleteQueryResponse,
    AttributesCompleteQueryVariables,
} from "./__generated__/AttributesCompleteQuery.graphql";

export const attributesCompleteQuery: Query<AttributesCompleteQueryVariables, AttributesCompleteQueryResponse> = graphql`
    query AttributesCompleteQuery {
        attributes {
            id
            name
            order
            description
            attributeType {
                id
                name
                section
            }
        }
    }
`;
