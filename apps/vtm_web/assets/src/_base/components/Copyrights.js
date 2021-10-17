// @flow

import React from "react";
import Typography from '@mui/material/Typography';

import type { Node } from "react";

const Copyright = (): Node => {
    return (
        <>
            <Typography variant="body2" color="textSecondary" align="center">
                Il codice e il cotenuto del sito sono stati interamente sviluppati e scritti dai gestori di Vampire the Masquerade: Buenos Aires by Night.
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                Il sito si ispira al Mondo di Tenebra, in particolare al contenuto dei manuali di Vampiri: la Masquerade, edito da White Wolf.
            </Typography>
            <Typography sx={{textAlign: "center"}}>
                <a href="https://www.worldofdarkness.com/"
                   target="_blank"
                   rel="noreferrer">
                    © Paradox Interactive. Trademarks belong to their respective owners. All rights reserved.
                </a>
            </Typography>
        </>
    );
};

export default Copyright;
