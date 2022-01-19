// @flow

import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../Main.Layout.Style";
import {menuTextStyle} from "../_layout/menu/menu-base-utils";
import {useHistory} from "react-router-dom";
import Box from "@mui/material/Box";
import {performLogout} from "../../services/logout-service";
import {LoginRoutes} from "../login/LoginRouter";
import type {GenericReactComponent} from "../../_base/types";

type Props = {
    title: string;
};

const Logout = ({title}: Props): GenericReactComponent => {
    const history = useHistory();

    useEffect(() => {
        // Invoking the logout service to delete all the cached information
        performLogout(() => {
            console.debug("cached information erased.");
        });
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            background: "url('logout-logo.webp')",
            backgroundPosition: "left top",
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundBlendMode: "screen",
            backgroundColor: "#101010",
            height: "100vh",
            width: "100%",
            overflow: "auto"
        }}>
            <Box sx={{
                margin: "auto auto"
            }}>
                <Typography paragraph sx={{
                    ...mainFontFamily,
                    color: "secondary.light",
                    fontSize: "3rem"
                }}>
                    {title}
                </Typography>
                <Typography paragraph sx={{
                    ...menuTextStyle,
                    textAlign: "center",
                    cursor: "pointer"
                }} onClick={_ => history.push(LoginRoutes.login)}>
                    Ritorna al login
                </Typography>
            </Box>
        </Box>
    );
}

export default Logout;
