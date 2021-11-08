// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import CharacterSheetDescriptionSection from "../sections/CharacterSheetDescriptionSection";
import CharacterSheetOffSection from "../sections/CharacterSheetOffSection";

type Props = {
    characterQuery: any
}

const CharacterSheetInfoTab = ({characterQuery}: Props): any => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <CharacterSheetDescriptionSection characterQuery={characterQuery} />
            </Grid>
            <Grid item xs={12}>
                <CharacterSheetOffSection characterQuery={characterQuery} />
            </Grid>
        </Grid>
    )
};

export default CharacterSheetInfoTab;
