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

/**
 * Returns a range between the two specified number (included).
 * @param from The lower boundary.
 * @param to The highest boundary.
 * @returns {Generator<number, void, number>} The generator.
 */
export function* range(from: number, to: number): Generator<number, void, number> {
    for (let i = from; i <= to; i++) {
        yield i;
    }
}

export function materialize<T>(generator: Generator<T, void, T>): T[] {
    const ret = [];
    for (const val of generator) {
        ret.push(val);
    }
    return ret;
}

export function getInitials(name: string): string {
    if (!name) {
        return "NF";
    }

    const splitted = name.split(" ");

    if (splitted.length === 1) return splitted[0][0].toUpperCase();
    else {
        return [splitted[0], splitted.pop()]
            .map(([f, ..._]) => f.toUpperCase())
            .join("");
    }
}
