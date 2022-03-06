// @flow

import {RecoilValueReadOnly, selector, useRecoilValue} from "recoil";
import {sessionStateAtom, storageUserInfoKey} from "./atoms";
import {isUserMaster} from "../services/base-types";
import {useHistory} from "react-router-dom";
import {getStorage} from "./effects";
import {useEffect} from "react";
import {LoginRoutes} from "../components/login/LoginRouter";

export const isUserMasterSelector: RecoilValueReadOnly<boolean> = selector<boolean>({
    key: 'isAdminSession',
    get: ({get}) => {
        const user = get(sessionStateAtom)

        if (user == null) {
            return false
        }

        return isUserMaster(user)
    }
})

export const useCheckSession = () => {
    const history = useHistory()
    const value = useRecoilValue(sessionStateAtom)
    const storage = getStorage()

    useEffect(() => {
        if (value == null && storage.getItem(storageUserInfoKey) == null) {
            history.push(LoginRoutes.login)
        }
    }, [history, storage, value])
}
