// @flow

import { post } from "./rest-utils";

export type User = {
    email: string;
    id: string;
    name: string;
}

export type LoginResponse = {
    data: {
        user: User
    }
}

export const login = (email: string, password: string, role: 'MASTER' | 'PLAYER'): Promise<LoginResponse> => 
    post<LoginResponse>("/login", {email, password, role});

export const check = (): Promise<LoginResponse> => 
    post<LoginResponse>("/check", {});

export const checkMaster = (): Promise<any> =>
    post<any>("/checkmaster", {});

export const storeLoginInformation = (user: User) => {
    sessionStorage.removeItem("x-session-info");
    sessionStorage.setItem("x-session-info", JSON.stringify(user));
}

export const getLoginInformation = (): Promise<?User> => 
    new Promise<?User>((res, rej) => {
        const inStorage = sessionStorage.getItem("x-session-info");
        
        if (inStorage && inStorage !== "") {
            res(JSON.parse(inStorage));
        }

        check()
            .then(response => {
                res(response.data.user);
            })
            .catch(e => {
                rej(e);
            });
    });

export const isMaster = (): Promise<bool> =>
    checkMaster()
        .then(_ => true)
        .catch(_ => false)
