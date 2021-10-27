// @flow

import {useCharactersChatAvatar} from "../../../services/queries/character/GetCharactersChatAvatarQuery";
import {uniques} from "../../../_base/utils";
import type {ChatEntry} from "../../../services/base-types";

/**
 * From the entries, tries to fetch the avatars for the chat avatar and map them into the entries,
 * returning them in the end
 * @param entries The avatar-less entries.
 * @return {ChatEntry[]} The entries with the avatar.
 */
export const useChatEntryAvatarQuery = (entries: Array<ChatEntry>): Array<ChatEntry> => {
    const characterIds = uniques(entries?.map(e => e?.character?.id));
    const avatars = useCharactersChatAvatar(characterIds);

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
