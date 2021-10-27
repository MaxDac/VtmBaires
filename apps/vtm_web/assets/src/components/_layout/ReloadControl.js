// @flow

import React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const ReloadControl = (): any => {
    return (
        <Tooltip title="Refresh Pagina" placement="bottom">
            <IconButton aria-label="Refresh" onClick={_ => document.location.reload()}>
                <RefreshIcon />
            </IconButton>
        </Tooltip>
    );
}

export default ReloadControl;
