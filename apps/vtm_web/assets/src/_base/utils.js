// @flow

import type {History} from "./types";
import {Routes} from "../AppRouter";

export type LogType = "log" | "info" | "warning" | "error";

export const isDevelopment = (): boolean =>
    process?.env?.NODE_ENV === "development";

export const log = (message: string, obj?: any, type?: LogType): void => {
    if (isDevelopment()) {
        switch (type) {
            case "error": return console.error(message, obj);
            case "info": return console.info(message, obj);
            case "warning": return console.warn(message, obj);
            default: return console.log(message, obj);
        }
    }
}

export function handleAuthorizedRejection({ push }: History): any => void {
    return (rejection: any) => {
        console.error("unauthorized by the back end", rejection);
        push(Routes.login);
    }
}

export function emptyArray<T>(): Array<T> {
    return [];
}
