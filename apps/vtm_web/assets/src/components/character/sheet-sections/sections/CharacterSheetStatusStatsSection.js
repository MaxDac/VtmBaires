// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import AttributeStat from "../../controls/AttributeStat";
import AttributeWithDamageStat from "../../controls/AttributeWithDamageStat";
import AttributeCumulativeStat from "../../controls/AttributeCumulativeStat";
import type {Character} from "../../../../services/queries/character/GetCharacterCompleteQuery";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {characterIsVampire} from "../../../../_base/utils";
import { defaultFormatDateAndTime } from "../../../../_base/date-utils";
import type {GenericReactComponent} from "../../../../_base/types";

type Props = {
    sheet: Character;
}

const CharacterSheetStatusStatsSection = ({sheet}: Props): GenericReactComponent => {
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
            const lastHuntDate = defaultFormatDateAndTime(sheet?.lastHunt ?? "");
            if (lastHuntDate != null && lastHuntDate !== "") {
                return (
                    <Grid item xs={12} sx={{
                        ...bottomLinesStyle,
                        margin: "10px"
                    }}>
                        <Paper variant="outlined" sx={{padding: "10px", margin: "10px"}}>
                            <Typography sx={{
                                fontFamily: "DefaultTypewriter"
                            }}>
                                L'ultima caccia risale al {defaultFormatDateAndTime(sheet?.lastHunt ?? "")},
                                ha avuto una
                                risonanza <b>{sheet.lastResonance} {resonanceIntensityLabel(sheet?.lastResonanceIntensity ?? 1)}</b>.
                            </Typography>
                        </Paper>
                    </Grid>
                );
            }

            return (<></>);
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
    };

    const showBloodPotency = () => {
        if (characterIsVampire(sheet)) {
            return (
                <Grid item xs={12} sx={bottomLinesStyle}>
                    <AttributeStat stat={{
                        name: "Potenza del Sangue",
                        value: sheet?.bloodPotency,
                        maxValue: 5
                    }} damage={0} />
                </Grid>
            );
        }

        return (<></>);
    };

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
            {showBloodPotency()}
            {showHunger()}
        </>
    );
}

export default CharacterSheetStatusStatsSection;
