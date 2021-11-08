// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import CharacterSheetBiographySection from "../sections/CharacterSheetBiographySection";
import CharacterSheetOthersSection from "../sections/CharacterSheetOthersSection";

type Props = {
    characterQuery: any;
}

const CharacterSheetDataTab = ({characterQuery}: Props): any => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <CharacterSheetBiographySection characterQuery={characterQuery} />
            </Grid>
            <Grid item xs={12}>
                <CharacterSheetOthersSection characterQuery={characterQuery} />
            </Grid>
        </Grid>
    );
}

export default CharacterSheetDataTab;
