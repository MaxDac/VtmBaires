// @flow

import type {History} from "./types";
import {Routes} from "../AppRouter";
import type {AlertInfo} from "./types";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

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

export function firstOrDefault<T>(a: ?Array<T>): ?T {
    if (a != null && a.length > 0) {
        return a[0];
    }
    
    return null;
}

/**
 * Returns a range between the two specified number (included).
 * @param from The lower boundary.
 * @param to The highest boundary.
 * @returns {Generator<number, void, number>} The generator.
 */
export function* range(from: number, to: number): Generator<number, void, number> {
    if (from > to) {
        return reverseRange(from, to);
    }

    for (let i = from; i <= to; i++) {
        yield i;
    }
}

export function* reverseRange(from: number, to: number): Generator<number, void, number> {
    if (to > from) {
        return range(from, to);
    }

    for (let i = from; i <= to; i--) {
        yield i;
    }
}

export function baseMenuItems(min: number, max: number) {
    const values = [];

    for (const v of range(min, max)) {
        values.push(<MenuItem key={v} value={v}>{v}</MenuItem>);
    }

    return values;
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

    const split = name.split(" ");

    if (split.length === 1) return split[0][0].toUpperCase();
    else {
        return [split[0], split.pop()]
            .map(([f,]) => f.toUpperCase())
            .join("");
    }
}

export function handleMutation<T>(mutation: () => Promise<T>, showNotification: AlertInfo => void, args?: ?{
    successMessage?: string,
    errorMessage?: string,
    onCompleted?: () => void
}) {
    return mutation()
        .then(result => {
            console.log("The result", result);

            if (args?.successMessage != null) {
                showNotification({
                    type: "success",
                    message: args?.successMessage ?? "La modifica è stata effettuata con successo"
                });
            }
        })
        .catch(error => {
            console.log("An error occoured while performing the mutation: ", error);
            showNotification({
                type: "error",
                message: args?.errorMessage ?? "La modifica non ha avuto successo, contatta un master per ulteriori informazioni."
            });
        })
        .finally(() => {
            if (args?.onCompleted != null) {
                args.onCompleted();
            }
        });
}
