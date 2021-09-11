import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../../_base/components/Alert";
import { parseGraphqlMessage } from "../../services/relay-utils";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

const AlertLayout = (params) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogText, setDialogText] = useState("");
    const [dialogOkAction, setDialogOkAction] = useState(() => {});
    const [dialogCancelAction, setDialogCancelAction] = useState(() => {});

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpen(false);
    }

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

    const setError = (error, defaultError) => {
        const e = parseGraphqlMessage(error, defaultError);
        setErrorMessage(e);
        setAlertOpen(true);
    }

    return (
        <div>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert type="error" onClose={handleAlertClose}>
                    {errorMessage}
                </Alert>
            </Snackbar>
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
            { params.children({
                openDialog: handleDialogOpen,
                setError
            }) }
        </div>);
};

export default AlertLayout;
