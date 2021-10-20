// @flow

import type {ChatEntry} from "../../../services/base-types";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import { emptyArray, toMap, uniques } from "../../../_base/utils";
import {getCharactersChatAvatarQuery} from "../../../services/queries/character/GetCharactersChatAvatarQuery";
import type {GetCharactersChatAvatarQuery} from "../../../services/queries/character/__generated__/GetCharactersChatAvatarQuery.graphql";

/**
 * From the existing chat entries, and enriches it with the character avatar, that instead will be taken from the cache
 * if not existent, using Relay configuration.
 * @param mapId The map id
 * @returns The chat entries.
 */
export const useChatEntriesForSubscriptions = (entries: ?Array<ChatEntry>): Array<ChatEntry> => {
    const nullOrEmptyEntries = entries ?? emptyArray<ChatEntry>();
    const characterIds = uniques(nullOrEmptyEntries.map(e => e?.character?.id));

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

    return nullOrEmptyEntries
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
