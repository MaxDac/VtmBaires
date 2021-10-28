// @flow

import {guideStyle, titleStyle} from "../GuidesStyles";
import Typography from "@mui/material/Typography";
import React from "react";

const GuidesSiteHelp = (): any => {
    return (
        <>
            <Typography paragraph sx={guideStyle}>
                <h1 style={titleStyle}>
                    Help del Sito
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <i>In questa sezione verr&agrave; spiegato il funzionamento del sito e delle sue sezioni.<br />
                In base ai vostri feedback, questa sezione verr&garave; progressivamente riempita come la sezione F.A.Q.</i>
            </Typography>
        </>
    );
};

export default GuidesSiteHelp;
