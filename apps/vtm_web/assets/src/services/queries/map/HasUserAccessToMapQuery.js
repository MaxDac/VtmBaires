// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {
    HasUserAccessToMapQueryResponse,
    HasUserAccessToMapQueryVariables,
} from "./__generated__/HasUserAccessToMapQuery.graphql";
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";

export const hasUserAccessToMapQuery: Query<HasUserAccessToMapQueryVariables, HasUserAccessToMapQueryResponse> = graphql`
    query HasUserAccessToMapQuery($chatId: ID!) {
        hasUserAccessToMap(chatId: $chatId)
    }
`;

export const useHasUserAccessToMap = (chatId: string): boolean =>
    useCustomLazyLoadQuery(hasUserAccessToMapQuery, {chatId}, {
        fetchPolicy: "network-only"
    })?.hasUserAccessToMap === true;
