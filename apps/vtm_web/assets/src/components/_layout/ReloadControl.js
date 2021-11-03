// @flow

import React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {menuIconStyle} from "./Menu";

const ReloadControl = (): any => {
    return (
        <Tooltip title="Refresh Pagina" placement="bottom">
            <IconButton aria-label="Refresh" onClick={_ => document.location.reload()}>
                <RefreshIcon sx={menuIconStyle} />
            </IconButton>
        </Tooltip>
    );
}

export default ReloadControl;
