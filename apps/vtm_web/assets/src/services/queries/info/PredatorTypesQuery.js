// @flow

import graphql from 'babel-plugin-relay/macro';
import type {
  PredatorTypesQueryResponse,
  PredatorTypesQueryVariables,
} from "./__generated__/PredatorTypesQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import { emptyExactObject } from "../../../_base/utils";

export const predatorTypesQuery: Query<PredatorTypesQueryVariables, PredatorTypesQueryResponse> = graphql`
    query PredatorTypesQuery {
        predatorTypes {
            id
            name
            description
        }
    }
`;

export function usePredatorTypes(): ?PredatorTypesQueryResponse {
    return useCustomLazyLoadQuery(predatorTypesQuery, emptyExactObject());
}
