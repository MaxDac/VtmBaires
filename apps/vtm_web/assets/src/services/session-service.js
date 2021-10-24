// @flow

import {checkMaster} from "./login-service";
import {getSessionCharacter} from "./queries/accounts/SessionCharacterQuery";
import type {Session, SessionCharacter, User} from "./base-types";
import type {IEnvironment} from "relay-runtime";
import {useContext, useEffect, useState} from "react";
import {SessionContext} from "../contexts";
import ClearSessionMutation from "./mutations/sessions/ClearSessionMutation";
import {cache} from "../_base/relay-environment";

const storageUserInfoKey = "vtm-baires-session-info";
const getStorage = (): Storage => localStorage;

export const storeSession = (response: Session) => {
    getStorage().removeItem(storageUserInfoKey);
    getStorage().setItem(storageUserInfoKey, JSON.stringify(response));
}

const checkCharacter = (environment: IEnvironment, session: Session): Promise<?Session> =>
    new Promise((resolve, _) => {
        if (session?.character != null) {
            resolve(session);
            return;
        }

        getSessionCharacter(environment)
            .then(response => {
                const newSession = {
                    ...session,
                    character: {
                        ...response?.getSessionCharacter,
                        clan: {
                            name: response?.getSessionCharacter?.clan?.name
                        }
                    }
                }

                updateSession(newSession);
                resolve(newSession);
            })
            .catch(e => {
                console.error("Error while trying to fetch the session character", e);
                resolve(null);
            });
    });

/**
 * Retrieve the session from the browser storage.
 * This method doesn't try to retrieve the character from the remote session.
 * @returns {Session} The session saved in the browser.
 */
export const getSessionSync = (): ?Session => {
    const inStorage = getStorage().getItem(storageUserInfoKey);

    if (inStorage && inStorage !== "") {
        return JSON.parse(inStorage);
    }

    return null;
}

/**
 * Gets the current login information. It tries to retrieve the character from the remote session
 * if it doesn't find it in the browser session.
 * @param environment: the Relay Environment, used for the query.
 * @returns {?SessionCharacter} The user.
 */
export const getSession = (environment: IEnvironment): Promise<?Session> => {
    const inStorage = getStorage().getItem(storageUserInfoKey);

    if (inStorage && inStorage !== "") {
        return checkCharacter(environment, JSON.parse(inStorage));
    }

    return new Promise((resolve, _) => resolve(null));
}

/**
 * Determines whether the user is a master or not.
 * @returns {Promise<bool>|Promise<bool|boolean>|*} True if the user is a master, False otherwise.
 */
export const isMaster = (): Promise<boolean> =>
    checkMaster()
        .then(_ => true)
        .catch(_ => false);

/**
 * Merges the current session info with the ones that are already stored.
 * @param info The session info.
 * @returns {Session} The new session info.
 */
export const updateSession = (info: Session): ?Session => {
    const olderSession = getSessionSync();
    const newSession = {
        ...olderSession,
        ...info
    };

    storeSession(newSession);

    return getSessionSync();
}

export const updateCurrentCharacter = (character: SessionCharacter): ?Session => {
    const currentSession = getSessionSync();

    if (currentSession) {
        updateSession({
            user: currentSession.user,
            character
        });
    }
}

export const clearRelaySession = () => {
    cache.clear();
}

export const destroySession = (): Promise<boolean> => {
    getStorage().clear();
    clearRelaySession();
    return ClearSessionMutation();
}

export type SessionInfo = {
    getUser: () => Promise<?User>;
    getCurrentCharacter: () => Promise<?SessionCharacter>;
    setCurrentCharacter: SessionCharacter => ?Session;
};

/**
 * This custom hook retrieves the session information.
 * @returns {SessionInfo} The session info.
 */
export function getSessionHookValue(environment: IEnvironment): SessionInfo {
    return {
        getUser: () => getSession(environment).then(x => x?.user),
        getCurrentCharacter: () => getSession(environment).then(x => x?.character),
        setCurrentCharacter: updateCurrentCharacter
    };
}

/**
 * This method gets the session (user and character)
 * @param sync If True, the method will return what is currently saved in the browser storage,
 * if false, and if the browser does not retain any information about the character, the method
 * will fetch the back-end information.
 * @returns {[User, SessionCharacter]} The user and the character in the session.
 */
export const useSession = (sync?: boolean): [?User, ?SessionCharacter] => {
    const sessionContext = useContext(SessionContext);
    const [sessionCharacter, setSessionCharacter] = useState<?SessionCharacter>(null);
    const [sessionUser, setSessionUser] = useState<?User>(null);

    useEffect(() => {
        const existent = getSessionSync();

        if (sync === true || (existent?.user != null && existent?.character != null)) {
            setSessionUser(existent?.user);
            setSessionCharacter(existent?.character)
        }
        else {
            sessionContext.getCurrentCharacter()
                .then(x => setSessionCharacter(_ => x));

            sessionContext.getUser()
                .then(x => setSessionUser(_ => x))
        }
    }, [sessionContext, sync]);

    return [sessionUser, sessionCharacter];
};
