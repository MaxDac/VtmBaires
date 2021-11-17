// @flow

import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Copyright from "../../_base/components/Copyrights";
import {useTheme} from "@mui/material/styles";
import JoinUsOnDiscord from "../../_base/components/JoinUsOnDiscord";
import {useMediaQuery} from "@mui/material";
import AppVersion from "../../_base/components/AppVersion";
import Pegi from "../../_base/components/Pegi";

type Props = {
    icon: any;
    title: string;
    children: any;
}

const LoginFrameLayout = (props: Props): any => {
    const theme = useTheme();
    // const classes = useStyles();

    const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

    const loginFrameBackgroundColor = isPhone ? "transparent" : "#000000C0";

    const logosDistancing = 2;

    return (
        <>
            <Avatar sx={{
                margin: theme.spacing(1),
                backgroundColor: "secondary.main",
                color: "black"
            }}>
                {props.icon}
            </Avatar>
            <Typography component="h1" variant="h5">
                {props.title}
            </Typography>
            <Typography paragraph sx={{
                fontSize: "14px",
                paddingTop: "10px"
            }}>
                Il sito &egrave; attualmente in alpha test. Questo vuol dire che non &egrave; garantito il funzionamento
                al 100% ed &egrave; possibile che alcuni dati verranno persi nel corso dello sviluppo, anche senza
                preavviso.
            </Typography>
            <Box sx={{
                width: "100%",
                background: loginFrameBackgroundColor
            }}>
                {props.children}
            </Box>
            <Box mt={logosDistancing}>
                <Pegi />
            </Box>
            <Box mt={logosDistancing}>
                <a href="https://www.digitalocean.com/?refcode=26dfc8b090af&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge">
                    <img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" />
                </a>
            </Box>
            <Box mt={logosDistancing}>
                <JoinUsOnDiscord />
            </Box>
            <Box mt={logosDistancing}>
                <Copyright />
            </Box>
            <Box mt={logosDistancing}>
                <AppVersion />
            </Box>
        </>
    );
}

export default LoginFrameLayout;
