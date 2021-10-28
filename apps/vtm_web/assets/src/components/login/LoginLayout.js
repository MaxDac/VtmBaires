// @flow

import React from 'react';
import { useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import type { Node } from "react";
import { performLogout } from "../../services/logout-service";
import NoCookieBar from "../../_base/components/NoCookieBar";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(/login-image.webp)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        color: theme.palette.grey[50]
    }
}));

export type HomeLayoutProps = {
    title: string;
    icon: any;
}

type LoginLayoutProps = HomeLayoutProps & {
    children: Node;
}

const LoginLayout = (props: LoginLayoutProps): Node => {
    const classes = useStyles();

    useEffect(() => {
        // Invoking the logout service to delete all the cached information
        performLogout(() => {
            console.log("cached information erased.");
        });
    }, []);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{
                background: "url('pattern.webp')"
            }}>
                <div className={classes.paper}>
                    {props.children}
                </div>
            </Grid>
            <NoCookieBar />
        </Grid>
    );
}

export default LoginLayout;
