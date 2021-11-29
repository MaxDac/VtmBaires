// @flow

import type {SessionInfo} from "../../services/session-service";
import {MainRoutes} from "../MainRouter";
import type {ChatEntry} from "../../services/base-types";
import {defaultFormatDateAndTime} from "../../_base/date-utils";
import {replaceAll} from "../../_base/utils";

/**
 * Sets the current location, updating the chat before the location change takes place. This is to avoid reloading
 * problems.
 * @param session The Session Info.
 * @param history The History.
 * @param chatId The chat id.
 * @param chatName The chat name.
 */
export const goToChatAndUpdateSession = (session: SessionInfo, history: any, chatId: string, chatName?: ?string) => {
    session.setCurrentLocation({id: chatId, name: chatName});
    history.push(MainRoutes.chat(chatId));
};

/**
 * Generates a file content from the chat entries.
 * @param entries The chat entries.
 * @returns The chat entries
 */
export const getFileTextFromChatEntries = (entries: Array<ChatEntry>): string => {
    const parseText = e =>
        replaceAll(
            replaceAll(
                replaceAll(e, "![Image]", ""),
                "![Link]", ""),
            "*", "");

    const getFileTextFromChatEntry = ({text, result, master, character, insertedAt}: ChatEntry): string => {
        const formattedDate = defaultFormatDateAndTime(insertedAt);

        const getMasterRow = () => `${formattedDate} - ${parseText(text)}`;

        const getNormalRow = () => `${formattedDate} - ${character?.name}: ${result != null && result !== "" ? parseText(result) : parseText(text)}`;

        if (master) {
            return getMasterRow();
        }

        return getNormalRow();
    };

    return entries
        .filter(c => c != null)
        .map(getFileTextFromChatEntry)
        .join("\r\n");
};
