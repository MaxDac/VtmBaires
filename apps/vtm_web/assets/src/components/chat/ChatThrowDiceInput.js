// @flow

import React, {useEffect} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export type ChatThrowDiceInputFormData = {

}

type ChatThrowDiceInputProps = {
    isOpen: boolean;
    onDialogClosing: () => void;
    onDialogFormSubmit: ChatThrowDiceInputFormData => void;
};

const ChatThrowDiceInput = (props: ChatThrowDiceInputProps): any => {
    const [open, setOpen] = React.useState(props.isOpen);

    useEffect(() => {
        setOpen(_ => props.isOpen);
    }, [props.isOpen]);

    const handleClose = () => {
        setOpen(false);
        props.onDialogClosing();
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>);
};

export default ChatThrowDiceInput;