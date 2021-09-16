// @flow

import React from "react";
import Grid from "@material-ui/core/Grid";

type Props = {
    classes: any,
    children: any
}

const ResponsiveInnerContainer = ({classes, children}: Props): any => {
    return (
        <Grid container class={classes.responseInnerContainer}>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
}

export default ResponsiveInnerContainer;
