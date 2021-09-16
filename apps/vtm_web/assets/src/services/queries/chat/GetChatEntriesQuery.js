// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery, wrapQuery} from "../../../_base/relay-utils";
import type {GraphQLTaggedNode} from "relay-runtime";
import type {GetChatEntriesQueryResponse} from "./__generated__/GetChatEntriesQuery.graphql";
import type {ChatEntry} from "../../base-types";

const chatEntriesQuery: GraphQLTaggedNode = graphql`
    query GetChatEntriesQuery($mapId: ID!) {
        mapChatEntries(mapId: $mapId) {
            id
            chatMapId
            characterId
            characterName
            characterChatAvatar
            result
            text
        }
    }
`;

export function useChatEntriesQuery(mapId: string): ?GetChatEntriesQueryResponse {
    return useCustomLazyLoadQuery(chatEntriesQuery, { mapId });
}

export function getChatEntries(mapId: string): Promise<?Array<ChatEntry>> {
    return wrapQuery(chatEntriesQuery, { mapId }, x => x.mapChatEntries);
}
