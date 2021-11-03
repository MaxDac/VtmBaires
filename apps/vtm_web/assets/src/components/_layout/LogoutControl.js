// @flow

import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {UtilityContext} from "../../contexts";
import {useHistory} from "react-router-dom";
import {performLogout} from "../../services/logout-service";
import Tooltip from '@mui/material/Tooltip';
import {LoginRoutes} from "../login/LoginRouter";
import {menuIconStyle} from "./Menu";

const LogoutControl = (): any => {
    const history = useHistory();
    const {openDialog} = useContext(UtilityContext);

    const logoutClick = _ => {
        openDialog("Logout", "Do you want to log out?", () =>
            performLogout(() => history.push(LoginRoutes.login)));
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
