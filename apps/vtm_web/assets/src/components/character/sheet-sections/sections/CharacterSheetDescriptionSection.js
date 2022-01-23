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
import type {GenericReactComponent} from "../../../../_base/types";

type Props = {
    characterQuery: CharacterFragments_characterInfo$key & CharacterFragments_characterSheet$key
}

const CharacterSheetDescriptionSection = ({characterQuery}: Props): GenericReactComponent => {
    const info = useFragment(
        characterInfoFragment,
        characterQuery);

    const sheet = useFragment(
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
            <ParsedText text={sheet?.description} ignoreDefaultComponents={true} internalDivSx={{
                ...mainFontFamily,
                marginBottom: "10px"
            }} />
        </Box>
    );
};

export default CharacterSheetDescriptionSection;
