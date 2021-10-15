// @flow

import type {GraphqlErrorMessage} from "./relay-utils";

export type History = {
    push: string => void;
};

export type AlertInfo = {
    type: 'success' | 'warning' | 'error' | 'info';
    duration?: number;
    graphqlError?: ?GraphqlErrorMessage;
    message?: ?string;
}

export type OpenDialogProps = (string, string, ?() => void, ?() => void) => void;

export type AlertContext = {
    openDialog: OpenDialogProps,
    showUserNotification: AlertInfo => void,
    setWait: boolean => void;
}
