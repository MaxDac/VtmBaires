// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import {useTheme} from "@mui/material/styles";

type Props = {
    children: any
}

const ResponsiveInnerContainer = ({children}: Props): any => {
    const theme = useTheme();

    return (
        <Grid container sx={{
            paddingLeft: {
                xs: 0,
                md: theme.spacing(10),
                lg: theme.spacing(20)
            },
            paddingRight: {
                xs: 0,
                md: theme.spacing(10),
                lg: theme.spacing(20)
            },
            paddingTop: theme.spacing(3)
        }}>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
}

export default ResponsiveInnerContainer;
