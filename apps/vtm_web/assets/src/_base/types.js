// @flow

import type {OpenDialogDelegate} from "../AppRouter";

export type History = {
    push: string => void;
};

export type DefaultComponentProps = {
    setError: (string, string) => void;
    openDialog: OpenDialogDelegate;
}
