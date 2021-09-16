// @flow

import {checkMaster} from "./login-service";
import type {User} from "./base-types";
import {userCharactersQuery} from "./queries/accounts/UserCharactersQuery";
import type {UserCharactersQuery} from "./queries/accounts/__generated__/UserCharactersQuery.graphql";
import type {UserCharacter} from "./queries/accounts/UserCharactersQuery";
import {useCustomLazyLoadQuery} from "../_base/relay-utils";
import {emptyArray} from "../_base/utils";

export type SessionCharacter = {
    id: string;
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
 * @returns {?SessionCharacter} The user.
 */
export const getLoginInformation = (): ?User => {
    const inStorage = sessionStorage.getItem(storageUserInfoKey);

    if (inStorage && inStorage !== "") {
        return JSON.parse(inStorage);
    }

    return null;
};

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

export type UserCharacters = "OnlyOne" | "MoreThanOne" | "NoOne";

export const useFetchCharacterIfOne = (): [UserCharacters, ?UserCharacter] => {
    const characters: Array<UserCharacter> = useCustomLazyLoadQuery<UserCharactersQuery>(userCharactersQuery, {}, {
        fetchPolicy: "store-and-network"
    })?.me?.userCharacters
        ?.filter(c => c != null)
        ?.map((m: any) => {
            return {
                id: m.id,
                name: (m.name : string),
                stage: m.stage,
                approved: m.approved,
                isComplete: m.isComplete,
                chatAvatar: m.chatAvatar
            };
        }) ?? emptyArray();

    if (characters == null) {
        return ["NoOne", null];
    }

    return [characters.length === 1 ? "OnlyOne" : "MoreThanOne", characters[0]];
}
