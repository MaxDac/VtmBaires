// @flow

import React from "react";
import {useFragment} from "react-relay";
import {
    characterInfoFragment, 
    characterOffFragment,
    characterSheetFragment
} from "../../../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterSheet$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import Typography from "@mui/material/Typography";
import type {CharacterFragments_characterInfo$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import {mainFontFamily} from "../../../Main.Layout.Style";
import SoundWrapperComponent from "../../../../_base/components/SoundWrapperComponent";
import type {CharacterFragments_characterOff$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterOff.graphql";
import Stack from "@mui/material/Stack";
import ParsedText from "../../../../_base/components/ParsedText";

export const avatarWidth: number = 270;
export const avatarHeight: number = 470;

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

    const off = useFragment<?CharacterFragments_characterOff$key>(
        characterOffFragment,
        characterQuery);

    const getSheetName = () =>
        info?.isNpc === true
            ? `${info?.name ?? ""} (PNG)`
            : info?.name;

    return (
        <Stack spacing={2}>
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
            {
                off?.soundtrack != null && off.soundtrack !== ""
                    ? (<SoundWrapperComponent soundSourceUrl={off.soundtrack} />)
                    : (<></>)
            }
        </Stack>
    );
};

export default CharacterSheetDescriptionSection;
