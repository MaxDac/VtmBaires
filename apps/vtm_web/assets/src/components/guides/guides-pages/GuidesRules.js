// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {guideStyle, titleStyle} from "../GuidesStyles";
import {Link} from "react-router-dom";
import { GuideRoutes } from "../GuidesMain";

const GuidesRules = (): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Adattamenti
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Lo scopo di questa sezione &egrave; quello di definire le cos&igrave; dette <b>Home Rules</b>,
                ovvero gli adattamenti e gli scostamenti alle regole indicate nei Manuli di riferimento, volte principalmente
                ad aiutare e rendere possibile lo svolgimento del gioco <b>Play by Chat</b>, che per sua natura
                segue logiche e dinamiche molto diverse dal gioco cartaceo, il vero <i>target</i> delle case editrici.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Accanto alle <b>Home Rules</b>, saranno elencate anche le principali differenze tra la Versione 5 dei manuali 
                e le vecchie versioni/regolamenti. La commistione &egrave; dovuta al fatto che molte delle Home Rules
                sono volte a limare proprio alcune nuove caratteristiche di regolamento che si discostano dalla V20.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <b>Nota</b>: alcune <i>Home Rules</i> che riguardano il regolamento sono state esposte nella sezione
                apposita della <Link to={GuideRoutes.mechanics}>guida</Link>.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Pregi e Difetti dei Sangue Debole
                </h3>
            </Typography>
        </>
    );
}

export default GuidesRules;
