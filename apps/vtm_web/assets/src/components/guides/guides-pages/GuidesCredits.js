// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { guideStyle, titleStyle } from "../GuidesStyles";

type Props = {

}

const GuidesCredits = (props: Props): any => {
    return (
        <>
            <Typography paragraph sx={guideStyle}>
                <h1 style={titleStyle}>
                    Credits
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <i>Under construction.</i>
            </Typography>
        </>
    );
}

export default GuidesCredits;
