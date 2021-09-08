// @flow

import {check, checkMaster} from "./login-service";

import type {User} from "./login-service";
import type {Id} from "./queries/character/character-types";

export type SessionCharacter = {
    id: Id;
    name: string;
}

export type UserSessionInfo = {
    selectedCharacter?: ?SessionCharacter;
};

const storageUserInfoKey ="vtm-baires-session-info";
const storageSessionInfoKey = "vtm-baires-user-session";

export const storeLoginInformation = (user: User) => {
    sessionStorage.removeItem(storageUserInfoKey);
    sessionStorage.setItem(storageUserInfoKey, JSON.stringify(user));
}

/**
 * Gets the current login information.
 * @returns {Promise<?SessionCharacter>} The user.
 */
export const getLoginInformation = (): Promise<?User> =>
    new Promise<?User>((res, rej) => {
        const inStorage = sessionStorage.getItem("x-session-info");

        if (inStorage && inStorage !== "") {
            res(JSON.parse(inStorage));
        }
        else {
            check()
                .then(response => {
                    res(response.data.user);
                })
                .catch(e => {
                    rej(e);
                });
        }
    });

/**
 * Determines whether the user is a master or not.
 * @returns {Promise<bool>|Promise<bool|boolean>|*} True if the user is a master, False otherwise.
 */
export const isMaster = (): Promise<bool> =>
    checkMaster()
        .then(_ => true)
        .catch(_ => false)

/**
 * Gets the session info for the current user.
 * @returns {{UserSessionInfo}|*} The user session info.
 */
export const getUserSessionInfo = (): UserSessionInfo => {
    const serializedSession = localStorage.getItem(storageSessionInfoKey);

    if (serializedSession && serializedSession.length > 0) {
        return JSON.parse(serializedSession);
    }

    return {};
}

/**
 * Merges the current session info with the ones that are already stored.
 * @param info The session info.
 * @returns {UserSessionInfo} The new session info.
 */
export const updateUserSessionInfo = (info: UserSessionInfo): UserSessionInfo => {
    const olderSession = getUserSessionInfo();
    const newSession = {
        ...olderSession,
        ...info
    };

    localStorage.setItem(storageSessionInfoKey, JSON.stringify(newSession));

    return getUserSessionInfo();
}

export const updateCurrentCharacter = (character: SessionCharacter): UserSessionInfo =>
    updateUserSessionInfo({
        ...getUserSessionInfo(),
        selectedCharacter: character
    });
