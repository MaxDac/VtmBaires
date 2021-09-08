// @flow

import {useEffect, useState} from "react";
import {Routes} from "../../AppRouter";
import {getLoginInformation, getUserSessionInfo, updateCurrentCharacter} from "../session-service";

import type { History } from "../../_base/types";
import type {User} from "../login-service";
import type {SessionCharacter, UserSessionInfo} from "../session-service";

export type SessionInfo = {
    user?: ?User;
    character?: ?SessionCharacter;
    setCurrentCharacter: SessionCharacter => ?UserSessionInfo;
}

/**
 * This custom hook retrieves the session information.
 * @param history The react router history.
 * @returns {{character: null, isMaster: boolean, user: null}} The session info.
 */
export function useSession(history: History): SessionInfo {
    const [user, setUser] = useState<?User>(null);
    const [character, setCharacter] = useState<?SessionCharacter>(null);

    useEffect(() => {
        const handleError = _ => history.push(Routes.login);

        getLoginInformation()
            .then(result => setUser(result))
            .catch(handleError);

        const sessionInfo = getUserSessionInfo();
        if (sessionInfo && sessionInfo.selectedCharacter) {
            setCharacter(sessionInfo.selectedCharacter);
        }
    }, [history]);

    return {
        user,
        character,
        setCurrentCharacter: updateCurrentCharacter
    };
}
