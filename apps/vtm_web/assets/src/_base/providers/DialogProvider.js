// @flow

import * as React from "react";
import {createContext, useContext, useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import type {GenericReactComponent} from "../types";

export type ShowDialogContextProps = {
    showDialog: (
        title: string,
        text: string,
        onOk: ?(() => void),
        onCancel?: ?(() => void)
    ) => void
}

export const ShowDialogContext: React.Context<ShowDialogContextProps> = createContext({
    showDialog: (_title, _text, _onOk, _onCancel) => {}
});

export const useDialog = (): ShowDialogContextProps =>
    useContext(ShowDialogContext);

type Props = {
    children: GenericReactComponent
}

type ButtonDelegate = {
    delegate: ?(() => void)
}

const DialogProvider = ({children}: Props): GenericReactComponent => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogText, setDialogText] = useState("");
    const [dialogOkAction, setDialogOkAction] = useState<ButtonDelegate>({ delegate: null });
    const [dialogCancelAction, setDialogCancelAction] = useState<ButtonDelegate>({ delegate: null });

    const handleDialogOpen = (
        title: string,
        text: string,
        onOk: ?(() => void),
        onCancel: ?(() => void)
    ) => {
        setDialogTitle(title)
        setDialogText(text)
        setDialogOkAction({ delegate: onOk })
        setDialogCancelAction({ delegate: onCancel })
        setDialogOpen(true)
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const onDialogOkClick = () => {
        if (dialogOkAction?.delegate) {
            dialogOkAction.delegate();
        }

        setDialogOpen(false);
    }

    const onDialogCancelClick = () => {
        if (dialogCancelAction?.delegate) {
            dialogCancelAction.delegate();
        }

        setDialogOpen(false);
    }

    return (
        <>
            <Dialog open={dialogOpen}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDialogCancelClick}>
                        No
                    </Button>
                    <Button onClick={onDialogOkClick} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <ShowDialogContext.Provider value={{
                showDialog: handleDialogOpen
            }}>
                {children}
            </ShowDialogContext.Provider>
        </>
    );
};

export default DialogProvider;
