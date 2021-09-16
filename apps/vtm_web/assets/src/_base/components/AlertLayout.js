// @flow

import React, {useState} from "react";
import { parseGraphqlMessage } from "../relay-utils";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSnackbar} from "notistack";
import type {AlertContext} from "../types";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff"
    }
}));

type Props = {
    children: AlertContext => any
}

const AlertLayout = (props: Props): any => {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogText, setDialogText] = useState("");
    const [dialogOkAction, setDialogOkAction] = useState(() => {});
    const [dialogCancelAction, setDialogCancelAction] = useState(() => {});

    const handleBackdropClose = () => setBackdropOpen(false);

    const handleBackdropOpen = () => setBackdropOpen(true);

    const wait = (mustWait: boolean) =>
        mustWait
            ? handleBackdropOpen()
            : handleBackdropClose();

    const handleDialogOpen = (
        title: string,
        text: string,
        onOk: ?() => void,
        onCancel: ?() => void
    ) => {
        setDialogTitle(title);
        setDialogText(text);
        setDialogOkAction(_ => onOk ?? (() => {}));
        setDialogCancelAction(_ => onCancel ?? (() => {}));
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const onDialogOkClick = () => {
        if (dialogOkAction) {
            dialogOkAction();
        }

        setDialogOpen(false);
    }

    const onDialogCancelClick = () => {
        if (dialogCancelAction) {
            dialogCancelAction();
        }

        setDialogOpen(false);
    }

    const defaultSnackbarVariant = {
        autoHideDuration: 3000,
        // snackbarActions
    }

    const setError = (errorProps) => {
        const { type, graphqlError, message } = errorProps;

        if (graphqlError && graphqlError?.errors?.length > 0) {
            const e = parseGraphqlMessage(graphqlError, message);
            enqueueSnackbar(e, { ...defaultSnackbarVariant, variant: type });
        }
        else {
            enqueueSnackbar(message, { ...defaultSnackbarVariant, variant: type });
        }
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={backdropOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog
                open={dialogOpen}
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
                    <Button onClick={onDialogCancelClick} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onDialogOkClick} color="secondary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            { props.children({
                openDialog: handleDialogOpen,
                setError,
                setWait: wait
            }) }
        </div>);
};

export default AlertLayout;
