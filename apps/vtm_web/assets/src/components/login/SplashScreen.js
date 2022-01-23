// @flow

import React from 'react';
import {useEffect} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {getSessionSync} from "../../services/session-service";
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from "../../AppRouter";
import CenteredBox from "../../_base/components/CenteredBox";
import {LoginRoutes} from "./LoginRouter";
import type {GenericReactComponent} from "../../_base/types";

const SplashScreen = (): GenericReactComponent => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = getSessionSync()?.user;
        if (user?.id != null) {
            navigate(AppRoutes.main);
        }
        else {
            navigate(LoginRoutes.login);
        }
    });

    const handleLogoClick = () => navigate(LoginRoutes.login);

    return (
        <Box onClick={_ => handleLogoClick()}>
            <CenteredBox innerBoxSx={{
                maxWidth: "237px",
                height: "70vh",
                background: `url("/Camarilla.webp") no-repeat`}} isBodyChild={true}>
                <CenteredBox isBodyChild={false}>
                    <Typography sx={{
                        fontFamily: 'DefaultTypewriter',
                        color: "#C92929",
                        fontSize: "24px",
                        textAlign: "center",
                        fontWeight: "bold",
                        textShadow: "2px 2px black, -2px 2px black"
                    }}>
                        Buenos Aires by Night<br />
                        <br />
                        Clicca per accedere
                    </Typography>
                </CenteredBox>
            </CenteredBox>
        </Box>
    )
};

export default SplashScreen;
