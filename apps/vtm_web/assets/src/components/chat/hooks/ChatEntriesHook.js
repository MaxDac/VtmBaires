// @flow

import type {ChatEntry} from "../../../services/base-types";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetChatEntriesQuery} from "../../../services/queries/chat/__generated__/GetChatEntriesQuery.graphql";
import { emptyArray, toMap, uniques } from "../../../_base/utils";
import {chatEntriesQuery} from "../../../services/queries/chat/GetChatEntriesQuery";
import {getCharactersChatAvatarQuery} from "../../../services/queries/character/GetCharactersChatAvatarQuery";
import type {GetCharactersChatAvatarQuery} from "../../../services/queries/character/__generated__/GetCharactersChatAvatarQuery.graphql";

export const useChatEntriesQuery = (mapId: string): Array<ChatEntry> => {
    return useCustomLazyLoadQuery<GetChatEntriesQuery>(chatEntriesQuery, { mapId }, {
        fetchPolicy: "network-only"
    })?.mapChatEntries
        ?.map(e => ({
            id: e?.id ?? "",
            character: {
                id: e?.character?.id ?? "",
                name: e?.character?.name ?? ""
            },
            chatMap: {
                id: e?.chatMap?.id ?? ""
            },
            result: e?.result ?? "",
            text: e?.text ?? "",
            insertedAt: e?.insertedAt ?? "",
            master: e?.master ?? false
        })) ?? emptyArray<ChatEntry>();
};

/**
 * Gets the chat entries, and enriches it with the character avatar, that instead will be taken from the cache
 * if not existent, using Relay configuration.
 * @param mapId The map id
 * @returns The chat entries.
 */
export const useChatEntries = (mapId: string): Array<ChatEntry> => {
    const entries = useChatEntriesQuery(mapId);

    const characterIds = uniques(entries?.map(e => e?.character?.id));

    const queryAvatars = useCustomLazyLoadQuery<GetCharactersChatAvatarQuery>(getCharactersChatAvatarQuery, {
        characterIds
    })?.getCharactersChatAvatar;

    const parsedAvatars = queryAvatars
        ?.map(a => {
            if (a?.id != null && a?.chatAvatar != null) {
                return [a.id, a.chatAvatar];
            }

            return null;
        });

    const avatars = toMap(parsedAvatars);

    return entries
        ?.map(entry => {
            if (entry != null) {
                return ({
                    ...entry,
                    character: {
                        ...entry?.character,
                        chatAvatar: avatars?.get(entry?.character?.id)
                    }
                });
            }

            return entry;
        })
};
