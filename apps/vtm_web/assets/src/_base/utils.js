// @flow

import type {History} from "./types";
import type {AlertInfo} from "./types";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {format, parseISO} from "date-fns"
import type { CharacterFragments_characterInfo } from "../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import type { Character } from "../services/queries/character/GetCharacterCompleteQuery";
import type { CharacterFragments_characterStats } from "../services/queries/character/__generated__/CharacterFragments_characterStats.graphql";
import {LoginRoutes} from "../components/login/LoginRouter";

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
        push(LoginRoutes.login);
    }
}

export function emptyReadOnlyArray<T>(): $ReadOnlyArray<T> {
    return [];
}

export function emptyArray<T>(): Array<T> {
    return [];
}

export function toArray<T>(readOnlyArray: ?$ReadOnlyArray<?T>): Array<?T> {
    if (readOnlyArray != null) {
        return ((readOnlyArray: any): Array<?T>);
    }

    return emptyArray<?T>();
}

export const uniques = <T>(arr: Array<T>): Array<T> => [...new Set(arr)];

export const toMap = <TKey, TValue>(arr: ?Array<?[?TKey, ?TValue]>): ?Map<TKey, TValue> =>
    arr?.reduce((map, next) => {
        if (next != null) {
            const [key, value] = next;

            if (key != null && value != null) {
                return map.set(key, value);
            }
        }

        return map;
    }, new Map<TKey, TValue>());

export function filterNulls<T>(arr: Array<?T>): Array<T> {
    return arr?.reduce((acc, p) => {
        if (p != null) {
            return [...acc, p];
        }

        return acc;
    }, []);
}

export function toNotNullArray<T>(readOnlyArray: ?$ReadOnlyArray<?T>): Array<T> {
    return filterNulls(toArray(readOnlyArray));
}

export function firstOrDefault<T>(a: ?Array<T>): ?T {
    if (a != null && a.length > 0) {
        return a[0];
    }
    
    return null;
}

export function castNotNull<T>(item: ?T): T {
    return ((item: any): T);
}

/**
 * Returns a range between the two specified number (included).
 * @param from The lower boundary.
 * @param to The highest boundary.
 * @returns {Generator<number, void, number>} The generator.
 */
export function* range(from: number, to: number): Generator<number, void, number> {
    if (from > to) {
        [from, to] = [to, from];
    }

    for (let i = from; i <= to; i++) {
        yield i;
    }
}

export function baseMenuItems(min: number, max: number): any {
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
    mutation()
        .then(result => {
            showNotification({
                type: "success",
                message: args?.successMessage ?? "La modifica è stata effettuata con successo"
            });
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

export const parseUTC = (date: string): Date => {
    if (date.slice(-1) !== "Z") {
        return parseISO(`${date}Z`);
    }

    return parseISO(date);
};

export const defaultFormatWithStringFormat = (date: ?any, formatString: string): ?string => {
    if (date != null) {
        const utcDate = parseUTC(date);
        return format(utcDate, formatString);
    }

    return null;
}

export const defaultFormatDateAndTime = (date: ?any): ?string =>
    defaultFormatWithStringFormat(date, "dd-LL-yyyy HH:mm");

export const defaultFormatTime = (date: ?any): ?string =>
    defaultFormatWithStringFormat(date, "HH:mm");

/**
 * Determines whether the caracter is a vampire or not based on the clan.
 * @param character The character.
 * @return True if the character is a vampire, False otherwise
 */
export const characterIsVampire = (character: ?CharacterFragments_characterInfo | ?Character | ?CharacterFragments_characterStats): boolean => {
    return character?.clan?.name !== "Umano";
}

/**
 * Determines whehter the character has disciplines or not based on its clan.
 * Only humans and thin-bloods will not have disciplines on creation.
 * @param character The character.
 * @return True if the character has disciplines, False otherwise.
 */
export const characterHasDisciplines = (character: ?CharacterFragments_characterInfo): boolean => {
    const clanName = character?.clan?.name;
    return !(clanName === "Umano" || clanName === "Thin Blood");
}

/**
 * Wrapper for the Javascript built-in function replaceAll that's not included in flow currently.
 * @param text The text.
 * @param what What to search.
 * @param withWhat What to substitute it with.
 * @return {string} The result text, with the substituted part.
 */
export const replaceAll = (text: string, what: string, withWhat: string): string => {
    // $FlowFixMe
    return text.replaceAll(what, withWhat);
}
