// @flow

import type {GraphqlErrorMessage} from "./relay-utils";

export type History = {
    push: string => void;
};

export type AlertInfo = {
    type: 'success' | 'warning' | 'error';
    graphqlError?: ?GraphqlErrorMessage;
    message?: ?string;
}

export type OpenDialogProps = (string, string, ?() => void, ?() => void) => void;

export type AlertContext = {
    openDialog: OpenDialogProps,
    setError: AlertInfo => void,
    setWait: boolean => void;
}
