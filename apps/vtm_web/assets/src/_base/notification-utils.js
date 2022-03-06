// @flow

import {useSnackbar} from "notistack";
import {tryTranslateError} from "./dictionary-utils";
import {parseGraphqlMessage} from "./relay-utils";
import type {AlertInfo} from "./types";

const defaultSnackbarVariant = {
    autoHideDuration: 3000,
    // snackbarActions
}

export type CustomProviderContext = {
    enqueueSnackbar: (message: AlertInfo) => string | number;
    closeSnackbar: (key?: string | number) => void;
}

/**
 * Customizes the snackbar creation method, wrapping it around the custom message management.
 */
export const useCustomSnackbar = (): CustomProviderContext => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    const enqueueSnackbarCustom = ({type, graphqlErrors, message, duration, key}: AlertInfo) => {
        if (graphqlErrors && graphqlErrors?.errors?.length > 0) {
            const e = tryTranslateError(parseGraphqlMessage(graphqlErrors, message));
            return enqueueSnackbar(e, {
                ...defaultSnackbarVariant,
                variant: type,
                autoHideDuration: duration ?? defaultSnackbarVariant.autoHideDuration,
                key: key
            });
        }
        else {
            return enqueueSnackbar(message, {
                ...defaultSnackbarVariant,
                variant: type,
                autoHideDuration: duration ?? defaultSnackbarVariant.autoHideDuration,
                key: key
            });
        }
    };

    return {
        enqueueSnackbar: enqueueSnackbarCustom,
        closeSnackbar
    }
}

export const requestDesktopNotificationPermission = () => {
    Notification.requestPermission(perm => console.debug("permission", perm));
};

export const showDesktopNotification = (title: string, text: string, tag?: string) => {
    if (Notification.permission === "granted") {
        const notification = new Notification(title, {
            dir: "auto",
            lang: "IT-it",
            body: text,
            tag: tag
        });
        console.debug("new notification", notification);
    }
    else {
        console.warn("Notifications not allowed");
    }
}
