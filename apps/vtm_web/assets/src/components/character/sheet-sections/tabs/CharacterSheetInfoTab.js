// @flow

import React from "react";
import {useFragment} from "react-relay";
import {characterSheetFragment} from "../../../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterSheet$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import Grid from "@mui/material/Grid";
import CharacterSheetDescriptionSection from "../sections/CharacterSheetDescriptionSection";
import CharacterSheetOffSection from "../sections/CharacterSheetOffSection";
import CharacterSheetAvatarSection from "../sections/CharacterSheetAvatarSection";

type Props = {
    characterQuery: any
}

const CharacterSheetInfoTab = ({characterQuery}: Props): any => {
    const sheet = useFragment<?CharacterFragments_characterSheet$key>(
        characterSheetFragment,
        characterQuery);

    const isDescriptionTooLong = (sheet?.description ?? "").length > 500;

    const showLateralMargin = !isDescriptionTooLong;

    return (
        <Grid container>
            <Grid item xs={false} lg={showLateralMargin ? 1 : false} xl={1} />
            <Grid item xs={12} sm={8} lg={5} xl={4}>
                <CharacterSheetAvatarSection characterQuery={characterQuery} />
            </Grid>
            <Grid item xs={12} sm={4} lg={showLateralMargin ? 5 : 7} xl={6}>
                <CharacterSheetDescriptionSection characterQuery={characterQuery} />
            </Grid>
            <Grid item xs={false} lg={showLateralMargin ? 1 : false} xl={1} />
            <Grid item xs={12}>
                <CharacterSheetOffSection characterQuery={characterQuery} />
            </Grid>
        </Grid>
    )
};

export default CharacterSheetInfoTab;
