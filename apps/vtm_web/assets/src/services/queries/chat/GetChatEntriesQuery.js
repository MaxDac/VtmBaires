// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GraphQLTaggedNode} from "relay-runtime";
import type {ChatEntry} from "../../base-types";
import {emptyArray} from "../../../_base/utils";
import type {GetChatEntriesQuery} from "./__generated__/GetChatEntriesQuery.graphql";

const chatEntriesQuery: GraphQLTaggedNode = graphql`
    query GetChatEntriesQuery($mapId: ID!) {
        mapChatEntries(mapId: $mapId) {
            id
            character {
                id
                name
                chatAvatar
            }
            chatMap {
                id
            }
            master
            result
            text
            insertedAt
        }
    }
`;

export function useChatEntriesQuery(mapId: string): Array<ChatEntry> {
    return useCustomLazyLoadQuery<GetChatEntriesQuery>(chatEntriesQuery, { mapId }, {
        fetchPolicy: "store-and-network"
    })?.mapChatEntries
        ?.map(e => ({
            id: e?.id ?? "",
            character: {
                id: e?.character?.id ?? "",
                name: e?.character?.name ?? "",
                chatAvatar: e?.character?.chatAvatar ?? ""
            },
            chatMap: {
                id: e?.chatMap?.id ?? ""
            },
            result: e?.result ?? "",
            text: e?.text ?? "",
            insertedAt: e?.insertedAt ?? "",
            master: e?.master ?? false
        })) ?? emptyArray<ChatEntry>();
}
