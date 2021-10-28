// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {guideStyle, titleStyle} from "../GuidesStyles";

const GuidesAttributes = (): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Abilit&agrave; e Attributi
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <i>In costruzione</i>
            </Typography>
        </>
    );
}

export default GuidesAttributes;
