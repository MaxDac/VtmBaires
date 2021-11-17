// @flow

import {checkMaster} from "./login-service";
import {getSessionCharacter} from "./queries/accounts/SessionCharacterQuery";
import type {
  Session,
  SessionCharacter,
  SessionLocation,
  User,
} from "./base-types";
import type {IEnvironment} from "relay-runtime";
import {useContext, useEffect, useState} from "react";
import {SessionContext} from "../contexts";
import ClearSessionMutation from "./mutations/sessions/ClearSessionMutation";
import {cache} from "../_base/relay-environment";

const storageUserInfoKey = "vtm-baires-session-info";
const getStorage = (): Storage => localStorage;

export const storeSession = (response: Session) => {
    const newSession = JSON.stringify(response);
    getStorage().removeItem(storageUserInfoKey);
    getStorage().setItem(storageUserInfoKey, newSession);
};

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
};

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

    // TODO getting the user session
    return new Promise((resolve, _) => resolve(null));
};

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
};

export const updateCurrentCharacter = (character: SessionCharacter): ?Session => {
    const currentSession = getSessionSync();

    if (currentSession) {
        updateSession({
            ...currentSession,
            character
        });
    }
};

export const updateCurrentLocation = (location: SessionLocation): ?Session => {
    const currentSession = getSessionSync();

    if (currentSession) {
        updateSession({
            ...currentSession,
            location
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
    getCurrentLocation: () => Promise<?SessionLocation>;
    setCurrentLocation: SessionLocation => ?Session;
};

/**
 * This custom hook retrieves the session information.
 * @returns {SessionInfo} The session info.
 */
export const getSessionHookValue = (environment: IEnvironment): SessionInfo => ({
    getUser: () => getSession(environment).then(x => x?.user),
    getCurrentCharacter: () => getSession(environment).then(x => x?.character),
    setCurrentCharacter: updateCurrentCharacter,
    getCurrentLocation: () => new Promise((r, _) => r(getSessionSync()?.location)),
    setCurrentLocation: updateCurrentLocation
});

/**
 * This method gets the session (user and character) in a synchronous manner, i.e., without calling the
 * back end.
 * @returns {[User, SessionCharacter, SessionLocation, Session]} The user and the character in the session.
 */
export const useSession = (): [?User, ?SessionCharacter, ?SessionLocation, ?Session] => {
    const session = getSessionSync();
    return [session?.user, session?.character, session?.location, session];
};

/**
 * This method gets the session (user and character), checking whether the session exists in the client,
 * otherwise calling the back end.
 * @returns {[User, SessionCharacter, SessionLocation, Session]} The user and the character in the session.
 */
export const useSessionAsync = (): [?User, ?SessionCharacter, ?SessionLocation, ?Session] => {
    const sessionContext = useContext(SessionContext);
    const [session,] = useState(getSessionSync());
    const [sessionCharacter, setSessionCharacter] = useState<?SessionCharacter>(null);
    const [sessionUser, setSessionUser] = useState<?User>(null);

    useEffect(() => {
        sessionContext.getCurrentCharacter()
            .then(x => setSessionCharacter(_ => x));

        sessionContext.getUser()
            .then(x => setSessionUser(_ => x));
    }, [sessionContext]);

    return [sessionUser, sessionCharacter, getSessionSync()?.location, session];
};
