// @flow

import React from "react";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {useHistory} from "react-router-dom";
import {performLogout} from "../../../services/logout-service";
import Tooltip from '@mui/material/Tooltip';
import {menuIconStyle} from "../menu/menu-base-utils";
import {Routes} from "../../../AppRouter";
import type {GenericReactComponent} from "../../../_base/types";
import {useDialog} from "../../../_base/providers/DialogProvider";

const LogoutControl = (): GenericReactComponent => {
    const history = useHistory();
    const {showDialog} = useDialog()

    const logoutClick = _ => {
        showDialog("Logout", "Vuoi uscire dal gioco?", () =>
            performLogout(() => history.push(Routes.logout)));
    }

    return (
        <Tooltip title="Logout" placement="bottom">
            <IconButton aria-label="logout" onClick={logoutClick}>
                <ExitToAppIcon sx={menuIconStyle} />
            </IconButton>
        </Tooltip>
    );
}

export default LogoutControl;
