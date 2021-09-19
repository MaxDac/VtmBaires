// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GraphQLTaggedNode} from "relay-runtime";
import type {ChatEntry} from "../../base-types";
import {emptyArray} from "../../../_base/utils";

const chatEntriesQuery: GraphQLTaggedNode = graphql`
    query GetChatEntriesQuery($mapId: ID!) {
        mapChatEntries(mapId: $mapId) {
            id
            chatMapId
            characterId
            characterName
            characterChatAvatar
            master
            result
            text
        }
    }
`;

export function useChatEntriesQuery(mapId: string): Array<ChatEntry> {
    return useCustomLazyLoadQuery(chatEntriesQuery, { mapId })?.mapChatEntries
        ?.map(e => ({
            id: e.id,
            chatMapId: e.chatMapId,
            characterId: e.characterId,
            characterName: e.characterName,
            characterChatAvatar: e.characterChatAvatar,
            result: e.result,
            text: e.text,
            master: e.master
        })) ?? emptyArray<ChatEntry>();
}
