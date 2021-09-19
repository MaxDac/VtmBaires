// @flow

import React from "react";
import type {GetCharacterQueryResponse} from "../../../services/queries/character/__generated__/GetCharacterQuery.graphql";
import {useFragment} from "react-relay";
import type {CharacterFragments_characterSheet$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import {characterSheetFragment} from "../../../services/queries/character/CharacterFragments";
import Typography from "@mui/material/Typography";

type Props = {
    characterQuery: any
}

const CharacterSheetBiographySection = ({characterQuery}: Props): any => {
    const sheet = useFragment<?CharacterFragments_characterSheet$key>(
        characterSheetFragment,
        characterQuery);

    return (
        <>
            <Typography sx={{
                fontFamily: 'GabrieleLightRibbon',
                color: "red",
                fontSize: "24px"
            }}>
                Biography
            </Typography>
            <Typography sx={{
                fontFamily: 'GabrieleLightRibbon'
            }}>
                {sheet?.biography}
            </Typography>
        </>
    );
}

export default CharacterSheetBiographySection;
