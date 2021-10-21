// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import AttributeStat from "../controls/AttributeStat";
import AttributeWithDamageStat from "../controls/AttributeWithDamageStat";
import AttributeCumulativeStat from "../controls/AttributeCumulativeStat";
import type {Character} from "../../../services/queries/character/GetCharacterCompleteQuery";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { characterIsVampire } from "../../../_base/utils";

type Props = {
    sheet: Character;
}

const CharacterSheetStatusStatsSection = ({sheet}: Props): any => {
    const bottomLinesStyle = {
        name: "Umanità",
        value: sheet?.humanity,
        maxValue: 10
    };

    const resonanceIntensityLabel = (resonancePower: number) => {
        switch (resonancePower) {
            case 2: return "fugace";
            case 3: return "intensa";
            case 4: return "acuta (discrasia)";
            default: return "trascurabile";
        }
    };

    const showHuntResult = () => {
        if (characterIsVampire(sheet)) {
            return (
                <Grid item xs={12} sx={{
                    ...bottomLinesStyle,
                    margin: "10px"
                }}>
                    <Paper elevation={12} sx={{padding: "10px", margin: "10px"}}>
                        <Typography>
                            L'ultima caccia risale al {new Date(sheet?.lastHunt ?? "").toLocaleString()},
                            ha avuto una risonanza <b>{sheet.lastResonance} {resonanceIntensityLabel(sheet?.lastResonanceIntensity ?? 1)}</b>.
                        </Typography>
                    </Paper>
                </Grid>
            );
        }

        return (<></>)
    };

    const showHunger = () => {
        if (characterIsVampire(sheet)) {
            return (
                <Grid item xs={12} sx={bottomLinesStyle}>
                    <AttributeStat stat={{
                        name: "Fame",
                        value: sheet?.hunger,
                        maxValue: 5
                    }} damage={sheet?.stains} />
                </Grid>
            );
        }

        return (<></>);
    }

    return (
        <>
            {showHuntResult()}
            <Grid item xs={12} sx={bottomLinesStyle}>
                <AttributeWithDamageStat stat={{
                    name: "Forza di Volontà",
                    value: sheet?.willpower,
                    maxValue: 10
                }} damage={sheet?.willpowerDamage ?? 0} />
            </Grid>
            <Grid item xs={12} sx={bottomLinesStyle}>
                <AttributeWithDamageStat stat={{
                    name: "Salute",
                    value: sheet?.health,
                    maxValue: 10
                }} damage={sheet?.aggravatedDamage ?? 0} secondDamage={sheet?.damage ?? 0} />
            </Grid>
            <Grid item xs={12} sx={bottomLinesStyle}>
                <AttributeCumulativeStat stat={{
                    name: "Umanità",
                    value: sheet?.humanity,
                    maxValue: 10
                }} damage={sheet?.stains ?? 0} />
            </Grid>
            {showHunger()}
        </>
    );
}

export default CharacterSheetStatusStatsSection;
