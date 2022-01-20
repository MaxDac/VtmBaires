// @flow

import React, {useState} from "react";
import {parseGraphqlMessage} from "../relay-utils";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {useSnackbar} from "notistack";
import type {AlertContext, GenericReactComponent} from "../types";
import useStyles from "../../components/Main.Layout.Style";
import {tryTranslateError} from "../dictionary-utils";

type Props = {
    children: AlertContext => any
}

const AlertLayout = (props: Props): GenericReactComponent => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
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

    const showUserNotification = notificationProps => {
        const { type, graphqlError, message, duration } = notificationProps;

        if (graphqlError && graphqlError?.errors?.length > 0) {
            const e = tryTranslateError(parseGraphqlMessage(graphqlError, message));
            enqueueSnackbar(e, {
                ...defaultSnackbarVariant,
                variant: type,
                autoHideDuration: duration ?? defaultSnackbarVariant.autoHideDuration
            });
        }
        else {
            enqueueSnackbar(message, {
                ...defaultSnackbarVariant,
                variant: type,
                autoHideDuration: duration ?? defaultSnackbarVariant.autoHideDuration
            });
        }
    };

    return (
        <div>
            <Backdrop className={classes.backdrop} open={backdropOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
                    <Button onClick={onDialogCancelClick} color="third">
                        No
                    </Button>
                    <Button onClick={onDialogOkClick} color="third" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            { props.children({
                openDialog: handleDialogOpen,
                showUserNotification,
                setWait: wait
            }) }
        </div>);
};

export default AlertLayout;
