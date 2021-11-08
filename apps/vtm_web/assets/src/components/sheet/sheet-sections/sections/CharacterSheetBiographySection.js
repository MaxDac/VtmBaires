// @flow

import React from "react";
import {useFragment} from "react-relay";
import type {CharacterFragments_characterSheet$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import {characterSheetFragment} from "../../../../services/queries/character/CharacterFragments";
import Typography from "@mui/material/Typography";
import ParsedText from "../../../../_base/components/ParsedText";
import {mainFontFamily} from "../../../Main.Layout.Style";

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
                fontFamily: 'DefaultTypewriter',
                color: "secondary.light",
                fontSize: "2rem",
                marginTop: "1rem"
            }}>
                Biografia
            </Typography>
            <ParsedText text={sheet?.biography} sx={mainFontFamily} />
        </>
    );
}

export default CharacterSheetBiographySection;
