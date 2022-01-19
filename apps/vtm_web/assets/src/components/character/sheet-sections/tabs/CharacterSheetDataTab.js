// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import CharacterSheetOthersSection from "../sections/CharacterSheetOthersSection";
import type {GenericReactComponent} from "../../../../_base/types";

type Props = {
    characterQuery: any;
}

const CharacterSheetDataTab = ({characterQuery}: Props): GenericReactComponent => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <CharacterSheetOthersSection characterQuery={characterQuery} />
            </Grid>
        </Grid>
    );
}

export default CharacterSheetDataTab;
