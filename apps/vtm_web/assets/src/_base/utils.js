// @flow

import type {History} from "./types";
import type {AlertInfo} from "./types";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import type { Character } from "../services/queries/character/GetCharacterCompleteQuery";
import type { CharacterFragments_characterStats } from "../services/queries/character/__generated__/CharacterFragments_characterStats.graphql";
import type { CharacterFragments_characterConcealedInfo } from "../services/queries/character/__generated__/CharacterFragments_characterConcealedInfo.graphql";
import {Routes} from "../AppRouter";
import type {SessionCharacter} from "../services/base-types";

export type LogType = "log" | "info" | "warning" | "error";

export const isDevelopment = (): boolean =>
    process?.env?.NODE_ENV === "development";

export const log = (message: string, obj?: any, type?: LogType): void => {
    if (isDevelopment()) {
        switch (type) {
            case "error": return console.error(message, obj);
            case "info": return console.info(message, obj);
            case "warning": return console.warn(message, obj);
            default: return console.debug(message, obj);
        }
    }
}

export const handleAuthorizedRejection = ({ push }: History): (any => void) =>
    (rejection: any) => {
        console.error("unauthorized by the back end", rejection);
        push(Routes.sessionExpired);
    };

// export const emptyReadOnlyArray = <T>(): $ReadOnlyArray<T> => [];

export const emptyArray = <T>(): Array<T> => [];

export const toArray = <T>(readOnlyArray: ?$ReadOnlyArray<?T>): Array<?T> => {
    if (readOnlyArray != null) {
        return ((readOnlyArray: any): Array<?T>);
    }

    return emptyArray<?T>();
};

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

export const filterNulls = <T>(arr: Array<?T>): Array<T> =>
    arr?.reduce((acc, p) => {
        if (p != null) {
            return [...acc, p];
        }

        return acc;
    }, []);

export const toNotNullArray = <T>(readOnlyArray: ?$ReadOnlyArray<?T>): Array<T> =>
    filterNulls(toArray(readOnlyArray));

export const firstOrDefault = <T>(a: ?Array<T>): ?T => {
    if (a != null && a.length > 0) {
        return a[0];
    }

    return null;
};

export const castNotNull = <T>(item: ?T): T => ((item: any): T);

/**
 * Returns a range between the two specified number (included).
 * @param from The lower boundary.
 * @param to The highest boundary.
 * @return {Generator<number, void, number>} The generator.
 */
export const range = function*(from: number, to: number): Generator<number, void, number> {
    if (from > to) {
        [from, to] = [to, from];
    }

    for (let i = from; i <= to; i++) {
        yield i;
    }
};

export const rangeArray = (from: number, to: number): Array<number> => {
    const ret = [];

    for (const i of range(from, to)) {
        ret.push(i);
    }

    return ret;
};

export const baseMenuItems = (min: number, max: number): any => {
    const values = [];

    for (const v of range(min, max)) {
        values.push(<MenuItem key={v} value={v}>{v}</MenuItem>);
    }

    return values;
};

export const materialize = <T>(generator: Generator<T, void, T>): T[] => {
    const ret = [];

    for (const val of generator) {
        ret.push(val);
    }

    return ret;
};

export const getInitials = (name: string): string => {
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
};

export const handleMutation = <T>(mutation: () => Promise<T>, showNotification: AlertInfo => void, args?: ?{
    successMessage?: string,
    errorMessage?: string,
    onCompleted?: () => void
}) => {
    mutation()
        .then(_result => {
            showNotification({
                type: "success",
                message: args?.successMessage ?? "La modifica è stata effettuata con successo"
            });
        })
        .catch(error => {
            console.error("An error occoured while performing the mutation: ", error);
            showNotification({
                type: "error",
                message: args?.errorMessage ?? "La modifica non ha avuto successo, contatta un master per ulteriori informazioni.",
                graphqlError: error
            });
        })
        .finally(() => {
            if (args?.onCompleted != null) {
                args.onCompleted();
            }
        });
};

/**
 * Determines whether the caracter is a vampire or not based on the clan.
 * @param character The character.
 * @return True if the character is a vampire, False otherwise
 */
export const characterIsVampire = (character: ?CharacterFragments_characterConcealedInfo | ?Character | ?CharacterFragments_characterStats | ?SessionCharacter): boolean => {
    return character?.clan?.name !== "Umano";
}

/**
 * Determines whehter the character has disciplines or not based on its clan.
 * Only humans and thin-bloods will not have disciplines on creation.
 * @param character The character.
 * @return True if the character has disciplines, False otherwise.
 */
export const characterHasDisciplines = (character: ?CharacterFragments_characterConcealedInfo): boolean => {
    const clanName = character?.clan?.name;
    return !(clanName === "Umano" || clanName === "Sangue Debole");
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

/**
 * Gets the RegEx validation string for an url.
 * @return {string} The URL RegEx validation string.
 */
export const getUrlValidationMatchString = (): RegExp =>
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/gi;

/**
 * Returns a random number for a random fetch key.
 * @return {number} The random number.
 */
export const randomFetchKey = (): number => Math.round(Math.random() * 100);

export type ComparisonOptions = 
    | "CaseSensitive"
    | "CaseInsensitive";

const parseComparisonStrings = (first: ?string, second: ?string, options: ?ComparisonOptions): [string, string] => {
    const [f, s] = options === "CaseSensitive"
        ? [first ?? "", second ?? ""]
        : [first ?? "", second ?? ""].map(s => s.toLowerCase());

    return [f, s];
}

/**
 * Delegate that orders two strings alphabetically.
 * @param first The first string
 * @param second The second string
 * @param options The comparison options
 * @return {number} 1 if the first string is "greater" than the second, 0 if it's equal, -1 if it's less than the second.
 */
export const orderAlphabetically = (first: ?string, second: ?string, options: ?ComparisonOptions): number => {
    const [f, s] = parseComparisonStrings(first, second, options);

    return f > s 
        ? 1
        : f === s ? 0 : -1;
};

/**
 * Checkes whether the search and the match string are equal.
 * @param name The search string
 * @param match The match string
 * @param options The comparison options
 * @return {boolean} True if the two strings are equal, False otherwise.
 */
export const matchNames = (name: ?string, match: ?string, options: ?ComparisonOptions): boolean => {
    const [n, m] = parseComparisonStrings(name, match, options);
    return n.indexOf(m) !== -1;
};
