// @flow

import React from "react";
import {useFragment} from "react-relay";
import {characterStateFragment} from "../../../../services/queries/character/CharacterFragments";
import Typography from "@mui/material/Typography";
import type {
    CharacterFragments_characterState$key
} from "../../../../services/queries/character/__generated__/CharacterFragments_characterState.graphql";
import ParsedText from "../../../../_base/components/ParsedText";
import {mainFontFamily} from "../../../Main.Layout.Style";

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
                fontFamily: 'DefaultTypewriter',
                color: "secondary.light",
                fontSize: "24px",
            }}>
                Tipo di Predatore
            </Typography>
            <Typography sx={{
                ...mainFontFamily,
                marginBottom: "10px"
            }}>
                {sheet?.predatorType?.name}
            </Typography>
            <Typography sx={{
                fontFamily: 'DefaultTypewriter',
                color: "secondary.light",
                fontSize: "24px",
            }}>
                Esperienza
            </Typography>
            <Typography sx={{
                ...mainFontFamily,
                marginBottom: "10px"
            }}>
                {sheet?.experience} punti esperienza
            </Typography>
            <Typography sx={{
                fontFamily: 'DefaultTypewriter',
                color: "secondary.light",
                fontSize: "24px",
            }}>
                Vantaggi
            </Typography>
            <ParsedText text={sheet?.advantages} sx={{
                ...mainFontFamily,
                marginBottom: "10px"
            }} />
            <Typography sx={{
                fontFamily: 'DefaultTypewriter',
                color: "secondary.light",
                fontSize: "24px"
            }}>
                Note
            </Typography>
            <ParsedText text={sheet?.notes} sx={mainFontFamily} />
        </>
    );
}

export default CharacterSheetOthersSection;
