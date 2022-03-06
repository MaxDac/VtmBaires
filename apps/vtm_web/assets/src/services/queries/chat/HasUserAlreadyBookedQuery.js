// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {
    HasUserAlreadyBookedQueryResponse,
    HasUserAlreadyBookedQueryVariables,
} from "./__generated__/HasUserAlreadyBookedQuery.graphql";
import {emptyExactObject} from "../../../_base/utils";

export const hasUserAlreadyBookedQuery: Query<HasUserAlreadyBookedQueryVariables, HasUserAlreadyBookedQueryResponse> = graphql`
    query HasUserAlreadyBookedQuery {
        hasUserAlreadyBooked
    }
`;

export const useHasUserAlreadyBooked = (): boolean =>
    useCustomLazyLoadQuery(hasUserAlreadyBookedQuery, emptyExactObject(), {
        fetchPolicy: "network-only"
    })?.hasUserAlreadyBooked === true;
