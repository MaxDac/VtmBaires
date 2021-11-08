// @flow

import React from "react";
import {useFragment} from "react-relay";
import {characterOffFragment} from "../../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterOff$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterOff.graphql";
import Box from "@mui/material/Box";
import ParsedText from "../../../_base/components/ParsedText";
import {mainFontFamily} from "../../Main.Layout.Style";
import SoundWrapperComponent from "../../../_base/components/SoundWrapperComponent";

type Props = {
    characterQuery: any
}

const CharacterSheetOffSection = ({characterQuery}: Props): any => {
    const sheet = useFragment<?CharacterFragments_characterOff$key>(
        characterOffFragment,
        characterQuery);

    return (
        <>
            <SoundWrapperComponent soundSourceUrl={sheet.soundtrack} />
            <Box>
                <ParsedText text={sheet.off} ignoreDefaultComponents sx={mainFontFamily} />
            </Box>
        </>
    );
}

export default CharacterSheetOffSection;
