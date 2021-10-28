// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {guideStyle, titleStyle} from "../GuidesStyles";

const GuidesCreation = (): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Creazione della Scheda
                </h1>
            </Typography>

            <Typography paragraph style={guideStyle}>
                <i>In costruzione</i>
            </Typography>
        </>
    );
}

export default GuidesCreation;
