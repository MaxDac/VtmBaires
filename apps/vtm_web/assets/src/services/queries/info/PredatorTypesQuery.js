// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime/query/GraphQLTag";
import type {PredatorTypesQueryResponse} from "./__generated__/PredatorTypesQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

export const predatorTypesQuery: GraphQLTaggedNode = graphql`
    query PredatorTypesQuery {
        predatorTypes {
            id
            name
            description
        }
    }
`;

export function usePredatorTypes(): ?PredatorTypesQueryResponse {
    return useCustomLazyLoadQuery(predatorTypesQuery, {});
}
