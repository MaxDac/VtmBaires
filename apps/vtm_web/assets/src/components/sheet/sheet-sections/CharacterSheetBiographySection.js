// @flow

import React from "react";
import type {GetCharacterQueryResponse} from "../../../services/queries/character/__generated__/GetCharacterQuery.graphql";
import {useFragment} from "react-relay";
import type {CharacterFragments_characterSheet$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import {characterSheetFragment} from "../../../services/queries/character/CharacterFragments";
import Typography from "@material-ui/core/Typography";

type Props = {
    classes: any,
    characterQuery: GetCharacterQueryResponse
}

const CharacterSheetBiographySection = ({classes, characterQuery}: Props): any => {
    const sheet = useFragment<?CharacterFragments_characterSheet$key>(
        characterSheetFragment,
        characterQuery.getCharacter);

    return (
        <>
            <Typography className={classes.sheetTitle}>
                Biography
            </Typography>
            <Typography className={classes.sheetText}>
                {sheet?.biography}
            </Typography>
        </>
    );
}

export default CharacterSheetBiographySection;
