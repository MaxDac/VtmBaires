// @flow

import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Copyright from "../../_base/components/Copyrights";
import {useTheme} from "@mui/styles";

type Props = {
    children: any;
}

const LoginFrameLayout = (props: Props): any => {
    const theme = useTheme();

    return (
        <>
            <Avatar sx={{
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            }}>
                {props.icon}
            </Avatar>
            <Typography component="h1" variant="h5">
                {props.title}
            </Typography>
            {props.children}
            <Box mt={5}>
                <Copyright />
            </Box>
            <Box mt={5}>
                <a href="https://www.digitalocean.com/?refcode=26dfc8b090af&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" /></a>
            </Box>
        </>
    );
}

export default LoginFrameLayout;
