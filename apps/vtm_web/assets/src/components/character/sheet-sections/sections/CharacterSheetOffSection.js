// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import {useFragment} from "react-relay";
import {characterOffFragment} from "../../../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterOff$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterOff.graphql";
import ParsedText from "../../../../_base/components/ParsedText";
import {mainFontFamily} from "../../../Main.Layout.Style";

type Props = {
    characterQuery: any
}

const CharacterSheetOffSection = ({characterQuery}: Props): any => {
    const sheet = useFragment<?CharacterFragments_characterOff$key>(
        characterOffFragment,
        characterQuery);

    return (
        <Grid item xs={12}>
            <ParsedText text={sheet?.off} ignoreDefaultComponents sx={mainFontFamily} />
        </Grid>
    );
}

export default CharacterSheetOffSection;
