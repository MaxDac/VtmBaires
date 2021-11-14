// @flow

import React from "react";
import {useFragment} from "react-relay";
import {
    characterInfoFragment,
    characterSheetFragment
} from "../../../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterSheet$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import Typography from "@mui/material/Typography";
import type {CharacterFragments_characterInfo$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import {mainFontFamily} from "../../../Main.Layout.Style";
import ParsedText from "../../../../_base/components/ParsedText";
import Box from "@mui/material/Box";

type Props = {
    characterQuery: any
}

const CharacterSheetDescriptionSection = ({characterQuery}: Props): any => {
    const info = useFragment<?CharacterFragments_characterInfo$key>(
        characterInfoFragment,
        characterQuery);

    const sheet = useFragment<?CharacterFragments_characterSheet$key>(
        characterSheetFragment,
        characterQuery);

    const getSheetName = () =>
        info?.isNpc === true
            ? `${info?.name ?? ""} (PNG)`
            : info?.name;

    return (
        <Box component="div">
            <Typography sx={{
                ...mainFontFamily,
                color: "secondary.light",
                fontSize: "24px"
            }}>
                {getSheetName()}
            </Typography>
            <ParsedText text={sheet?.description} ignoreDefaultComponents={true} sx={{
                ...mainFontFamily,
                marginBottom: "10px"
            }} />
        </Box>
    );
};

export default CharacterSheetDescriptionSection;
