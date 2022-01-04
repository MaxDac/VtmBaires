// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import type {AvailablePrivateChatsQuery} from "./__generated__/AvailablePrivateChatsQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {castNotNull} from "../../../_base/utils";

export const availablePrivateChatsQuery: GraphQLTaggedNode = graphql`
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
    useCustomLazyLoadQuery<AvailablePrivateChatsQuery>(availablePrivateChatsQuery, {}, {
        fetchPolicy: "network-only"
    })
        ?.availablePrivateChats
        ?.filter(m => m?.id != null)
        ?.map(m => ({id: castNotNull(m?.id), name: m?.name})) ?? [];
