// @flow

import {logout} from "./login-service";

export const performLogout = (onLogoutCompleted: () => void) => {
    const clearClientSession = () => {
        localStorage.clear();
        sessionStorage.clear();
        console.log("performing logout");
        onLogoutCompleted();
    }

    window.addEventListener("unhandledrejection", e => {
        console.error("Unhandled error", e);
        clearClientSession();
    })

    try {
        logout()
            .catch(e => {
                console.error("Error while performing logout", e);
            })
            .finally(() => {
                clearClientSession();
            });
    }
    catch (e) {
        console.error("Catastrophic error", e);
        clearClientSession();
    }
};