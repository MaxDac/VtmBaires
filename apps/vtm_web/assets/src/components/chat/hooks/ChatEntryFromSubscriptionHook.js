// @flow

import type {ChatEntry} from "../../../services/base-types";
import {emptyArray} from "../../../_base/utils";
import {useChatEntryAvatarQuery} from "./ChatEntryAvatarsHook";

/**
 * From the existing chat entries, and enriches it with the character avatar, that instead will be taken from the cache
 * if not existent, using Relay configuration.
 * @param entries The chat entries
 * @return The chat entries.
 */
export const useChatEntriesForSubscriptions = (entries: ?Array<ChatEntry>): Array<ChatEntry> => {
    const nullOrEmptyEntries = entries ?? emptyArray<ChatEntry>();
    return useChatEntryAvatarQuery(nullOrEmptyEntries);
};
