// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {guideStyle, titleStyle} from "../GuidesStyles";

const GuidesMechanics = (): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Meccaniche di Gioco V5
                </h1>
            </Typography>

            <Typography paragraph style={guideStyle}>
                <i>In costruzione</i>
            </Typography>
        </>
    );
}

export default GuidesMechanics;
