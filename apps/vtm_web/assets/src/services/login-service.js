// @flow

import { post } from "../_base/rest-utils";
import type {Session} from "./base-types";

export type LoginResponse = {|
    data: Session;
|};

export const login = (email: string, password: string, remember: boolean): Promise<LoginResponse> =>
    post<LoginResponse>("/login", {email, password, remember});

export const check = (): Promise<LoginResponse> => 
    post<LoginResponse>("/check", {});

export const checkMaster = (): Promise<any> =>
    post<any>("/checkmaster", {});

export const logout = (): Promise<any> =>
    post<any>("/logout", {});
