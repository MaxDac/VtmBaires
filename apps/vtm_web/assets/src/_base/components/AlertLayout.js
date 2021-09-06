import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../../_base/components/Alert";
import { parseGraphqlMessage } from "../../services/relay-utils";

const AlertLayout = (params) => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    const setError = (error, defaultError) => {
        const e = parseGraphqlMessage(error, defaultError);
        setErrorMessage(e);
        setOpen(true);
    }

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert type="error" onClose={handleClose}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            { params.children(setError) }
        </div>);
};

export default AlertLayout;
