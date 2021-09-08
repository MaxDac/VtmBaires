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
