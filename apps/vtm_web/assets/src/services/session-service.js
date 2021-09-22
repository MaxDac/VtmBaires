// @flow

import {checkMaster} from "./login-service";
import {userCharactersQuery} from "./queries/accounts/UserCharactersQuery";
import type {UserCharactersQuery} from "./queries/accounts/__generated__/UserCharactersQuery.graphql";
import type {UserCharacter} from "./queries/accounts/UserCharactersQuery";
import {useCustomLazyLoadQuery} from "../_base/relay-utils";
import {emptyArray} from "../_base/utils";
import type {Session, SessionCharacter} from "./base-types";

const storageUserInfoKey ="vtm-baires-session-info";

export const storeSession = (response: Session) => {
    sessionStorage.removeItem(storageUserInfoKey);
    sessionStorage.setItem(storageUserInfoKey, JSON.stringify(response));
}

/**
 * Gets the current login information.
 * @returns {?SessionCharacter} The user.
 */
export const getSession = (): ?Session => {
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
        .catch(_ => false);

/**
 * Merges the current session info with the ones that are already stored.
 * @param info The session info.
 * @returns {Session} The new session info.
 */
export const updateSession = (info: Session): ?Session => {
    const olderSession = getSession();
    const newSession = {
        ...olderSession,
        ...info
    };

    localStorage.setItem(storageUserInfoKey, JSON.stringify(newSession));

    return getSession();
}

export const updateCurrentCharacter = (character: SessionCharacter): ?Session => {
    const currentSession = getSession();

    if (currentSession) {
        updateSession({
            user: currentSession.user,
            session: character
        });
    }
}

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
