// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {guideStyle, titleStyle} from "../GuidesStyles";
import type {GenericReactComponent} from "../../../_base/types";

const GuidesFaq = (): GenericReactComponent => {
    return (
        <>
            <Typography paragraph sx={guideStyle}>
                <h1 style={titleStyle}>
                    F.A.Q.
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Questa sezione sar&agrave; dedicata alle risposte alle domande
                pi&ugrave; frequenti. Vi invitiamo a contattarci in caso riteniate 
                sia utile aggiungere la vostra domanda alla lista.
            </Typography>
        </>
    );
}

export default GuidesFaq;
