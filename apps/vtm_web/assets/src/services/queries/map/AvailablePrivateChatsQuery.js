// @flow

import graphql from 'babel-plugin-relay/macro';
import type {
    AvailablePrivateChatsQueryResponse,
    AvailablePrivateChatsQueryVariables,
} from "./__generated__/AvailablePrivateChatsQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {castNotNull, emptyExactObject} from "../../../_base/utils";
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";

export const availablePrivateChatsQuery: Query<AvailablePrivateChatsQueryVariables, AvailablePrivateChatsQueryResponse> = graphql`
    query AvailablePrivateChatsQuery {
        availablePrivateChats {
            id
            name
        }
    }
`;

export type AvailablePrivateChat = {
    id: string,
    name: ?string
};

export const useAvailablePrivateChats = (): Array<AvailablePrivateChat> =>
    useCustomLazyLoadQuery(availablePrivateChatsQuery, emptyExactObject(), {
        fetchPolicy: "network-only"
    })
        ?.availablePrivateChats
        ?.filter(m => m?.id != null)
        ?.map(m => ({id: castNotNull(m?.id), name: m?.name})) ?? [];
