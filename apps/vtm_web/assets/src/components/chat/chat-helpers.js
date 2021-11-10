// @flow

import type {SessionInfo} from "../../services/session-service";
import {MainRoutes} from "../MainRouter";

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