// @flow

import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {UtilityContext} from "../../../contexts";
import {useNavigate} from "react-router-dom";
import {performLogout} from "../../../services/logout-service";
import Tooltip from '@mui/material/Tooltip';
import {menuIconStyle} from "../menu/menu-base-utils";
import {AppRoutes} from "../../../AppRouter";
import type {GenericReactComponent} from "../../../_base/types";

const LogoutControl = (): GenericReactComponent => {
    const navigate = useNavigate();
    const {openDialog} = useContext(UtilityContext);

    const logoutClick = _ => {
        openDialog("Logout", "Vuoi uscire dal gioco?", () =>
            performLogout(() => navigate(AppRoutes.logout)));
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
