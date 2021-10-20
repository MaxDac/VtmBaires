// @flow

import React from 'react';
import { useEffect } from "react";
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { getSessionSync } from "../../services/session-service";
import { useHistory } from 'react-router';
import { Routes } from "../../AppRouter";
import CenteredBox from "../../_base/components/CenteredBox";

const SplashScreen = (): any => {
    const history = useHistory();

    useEffect(() => {
        const user = getSessionSync()?.user;
        if (user?.id != null) {
            history.push(Routes.main);
        }
        else {
            history.push(Routes.login);
        }
    });

    const handleLogoClick = () => history.push(Routes.login);

    return (
        <Box onClick={_ => handleLogoClick()}>
            <CenteredBox innerBoxSx={{
                maxWidth: "237px",
                height: "70vh",
                background: `url("/Camarilla.png") no-repeat`}} isBodyChild={true}>
                <CenteredBox isBodyChild={false}>
                    <Typography sx={{
                        fontFamily: 'GabrieleLightRibbon',
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
