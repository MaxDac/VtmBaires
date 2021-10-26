// @flow

import React from "react";
import Typography from "@mui/material/Typography";

const CookieFreePolicy = (): any => {
    return (
        <Typography variant="body2"
                    color="textSecondary">
            Questo sito fa uso unicamente di cookies chiamati <b>tecnici</b>, utilizzati per migliorare l'esperienza
            e l'usabilit&agrave; da parte dell'utente. Puoi controllare che il sito sia effettivamente <i>cookie-free</i>&nbsp;
            accedendo a questo&nbsp;
            <a href="https://nibirumail.com/cookies/policy/?url=vtmbaires.eu" target="_blank" rel="noreferrer">link</a>.
        </Typography>
    );
}

export default CookieFreePolicy;
