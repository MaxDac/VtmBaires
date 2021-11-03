// @flow

import * as DateFns from "date-fns";

const format = (
    date: Date | number,
    format: string,
    options?: {
        locale?: DateFns.Locale;
        weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        firstWeekContainsDate?: number;
        useAdditionalWeekYearTokens?: boolean;
        useAdditionalDayOfYearTokens?: boolean;
    }
): ?string => {
    try {
        return DateFns.format(date, format, options);
    }
    catch (e) {
        console.error("Error while formatting expression", {
            error: e,
            argument: date,
            format
        });
        return null;
    }
};

const parseISO = (
    argument: string,
    options?: {
        additionalDigits?: 0 | 1 | 2
    }
): ?Date => {
    try {
        return DateFns.parseISO(argument, options);
    }
    catch (e) {
        console.error("Error while formatting expression", {
            argument,
            error: e
        });
        return null;
    }
}

/**
 * Parses a date in UTC.
 * @param date The UTC date.
 * @return {?Date} The resulting date.
 */
export const parseUTC = (date: string): ?Date => {
    if (date.slice(-1) !== "Z") {
        return parseISO(`${date}Z`);
    }

    return parseISO(date);
};

/**
 * Tries to convert the date as a UTC date, then formats the date with the given string.
 * @param date The UTC date, or a string representing the UTC date.
 * @param formatString The format string.
 * @return {?string} The resulting string, or null if the conversion didn't succeeded.
 */
export const defaultFormatWithStringFormat = (date: ?any, formatString: string): ?string => {
    if (date != null) {
        const utcDate = parseUTC(date);
        
        if (utcDate != null) {
            return format(utcDate, formatString);
        }
    }

    return null;
}

/**
 * Formats the given Date or string in the default date and time representation
 * @param date The UTC date.
 * @return {?string} The date-time string representation, or null if the conversion fails.
 */
export const defaultFormatDateAndTime = (date: ?any): ?string =>
    defaultFormatWithStringFormat(date, "dd-LL-yyyy HH:mm");

/**
 * Formats the given Date or string in the default date representation
 * @param date The UTC date.
 * @return {?string} The date string representation, or null if the conversion fails.
 */
export const defaultFormatDate = (date: ?any): ?string =>
    defaultFormatWithStringFormat(date, "dd-LL-yyyy");

/**
 * Formats the given Date or string in the default time representation
 * @param date The UTC date.
 * @return {?string} The time string representation, or null if the conversion fails.
 */
export const defaultFormatTime = (date: ?any): ?string =>
    defaultFormatWithStringFormat(date, "HH:mm");
