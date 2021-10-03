// @flow

import React from "react";
import {useFragment} from "react-relay";
import {characterStateFragment} from "../../../services/queries/character/CharacterFragments";
import Typography from "@mui/material/Typography";
import type {
    CharacterFragments_characterState$key
} from "../../../services/queries/character/__generated__/CharacterFragments_characterState.graphql";

type Props = {
    characterQuery: any
}

const CharacterSheetOthersSection = ({characterQuery}: Props): any => {
    const sheet = useFragment<?CharacterFragments_characterState$key>(
        characterStateFragment,
        characterQuery);

    return (
        <>
            <Typography sx={{
                fontFamily: 'GabrieleLightRibbon',
                color: "red",
                fontSize: "24px",
            }}>
                Vantaggi
            </Typography>
            <Typography sx={{
                fontFamily: 'GabrieleLightRibbon',
                marginBottom: "10px"
            }}>
                {sheet?.advantages}
            </Typography>
            <Typography sx={{
                fontFamily: 'GabrieleLightRibbon',
                color: "red",
                fontSize: "24px"
            }}>
                Note
            </Typography>
            <Typography sx={{
                fontFamily: 'GabrieleLightRibbon'
            }}>
                {sheet?.notes}
            </Typography>
        </>
    );
}

export default CharacterSheetOthersSection;
