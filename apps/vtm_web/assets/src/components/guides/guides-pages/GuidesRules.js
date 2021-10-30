// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { guideStyle, titleStyle } from "../GuidesStyles";

const GuidesRules = (): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Adattamenti rispetto alla V5
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <i>In costruzione</i>
            </Typography>
        </>
    );
}

export default GuidesRules;
