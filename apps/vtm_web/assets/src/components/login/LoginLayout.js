// @flow

import React from 'react';
import { useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import type { Node } from "react";
import { performLogout } from "../../services/logout-service";
import NoCookieBar from "../../_base/components/NoCookieBar";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";

export type HomeLayoutProps = {
    title: string;
    icon: any;
}

type LoginLayoutProps = HomeLayoutProps & {
    children: Node;
}

const LoginLayout = (props: LoginLayoutProps): Node => {
    const theme = useTheme();
    // const classes = useStyles();

    const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

    const loginFrameBackgroundColor = isPhone
        ? "#191919EE"
        // : "linear-gradient(to right, #191919EE, #191919)"
        : "transparent"
    ;

    useEffect(() => {
        // Invoking the logout service to delete all the cached information
        performLogout(() => {
            console.log("cached information erased.");
        });
    }, []);

    return (
        <Grid container component="main" sx={{
            height: '100vh',
            // backgroundImage: 'url(/login-image.webp)',
            backgroundImage: 'url(/login-wallpaper-inverted.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: "black",
            backgroundSize: 'contain',
            backgroundPosition: 'left top',
            backgroundBlendMode: "hard-light"
        }}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7}>
                <Typography sx={{
                    fontFamily: "Disturbed",
                    fontSize: "2rem",
                    color: "#191919",
                    position: "absolute",
                    bottom: "10px",
                    width: {
                        xs: "100%",
                        sm: "40%",
                        md: "65%"
                    },
                    textShadow: "1px 1px black",
                    textAlign: "center"
                }}>
                    Buenos Aires by Night
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{
                background: loginFrameBackgroundColor,
                overflow: "auto",
                height: "100vh"
            }}>
                <div style={{
                    margin: theme.spacing(8, 4),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {props.children}
                </div>
            </Grid>
            <NoCookieBar />
        </Grid>
    );
}

export default LoginLayout;
