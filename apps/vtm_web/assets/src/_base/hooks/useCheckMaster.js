// @flow

import {useEffect} from "react";
import {isMaster} from "../../services/login-service";
import {Routes} from "../../AppRouter";

import type { History } from "../types";

export function useCheckMaster(history: History): void {
    useEffect(() => {
        isMaster()
            .then(result => {
                if (!result) {
                    history.push(Routes.main);
                }
            })
            .catch(_ => {
                history.push(Routes.main)
            })
    }, [history]);
}
