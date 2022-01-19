// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import {useTheme} from "@mui/material/styles";
import type {GenericReactComponent} from "../types";

type Props = {
    sx?: any;
    children: any;
}

const ResponsiveInnerContainer = ({sx, children}: Props): GenericReactComponent => {
    const theme = useTheme();

    return (
        <Grid container sx={{
            ...sx,
            paddingLeft: {
                xs: 0,
                md: 0,
                lg: theme.spacing(5)
            },
            paddingRight: {
                xs: 0,
                md: 0,
                lg: theme.spacing(5)
            }
        }}>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
}

export default ResponsiveInnerContainer;
