// @flow

import React from "react";
import {useFragment} from "react-relay";
import {
    characterInfoFragment, characterOffFragment,
    characterSheetFragment
} from "../../../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterSheet$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type {CharacterFragments_characterInfo$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import {mainFontFamily} from "../../../Main.Layout.Style";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SoundWrapperComponent from "../../../../_base/components/SoundWrapperComponent";
import type {CharacterFragments_characterOff$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterOff.graphql";
import Stack from "@mui/material/Stack";

export const avatarHeight: number = 350;
export const avatarWidth: number = 400;

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
        <Grid container>
            <Grid item xs={12} lg={7} xl={5} sx={{
                textAlign: "center"
            }}>
                <Paper sx={{
                    width: "410px",
                    height: "360px",
                    display: "inline-flex",
                    textAlign: "center",
                    margin: "1rem",
                    backgroundColor: "background.paper"
                }} variant="outlined">
                    <Box sx={{
                        margin: "0 auto",
                        marginTop: "auto",
                        marginBottom: "auto",
                        background: `url('${sheet?.avatar ?? ""}')`,
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        width: "400px",
                        height: "350px"
                    }} />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={5} xl={7}>
                <Stack spacing={2}>
                    <Typography sx={{
                        ...mainFontFamily,
                        color: "secondary.light",
                        fontSize: "24px"
                    }}>
                        {getSheetName()}
                    </Typography>
                    <Typography sx={mainFontFamily}>
                        {sheet?.description}
                    </Typography>
                    {
                        off?.soundtrack != null && off.soundtrack !== ""
                            ? (<SoundWrapperComponent soundSourceUrl={off.soundtrack} />)
                            : (<></>)
                    }
                </Stack>
            </Grid>
        </Grid>
    )
};

export default CharacterSheetDescriptionSection;
