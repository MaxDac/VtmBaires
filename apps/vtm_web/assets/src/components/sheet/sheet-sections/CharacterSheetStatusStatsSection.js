// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import AttributeStat from "../controls/AttributeStat";
import AttributeWithDamageStat from "../controls/AttributeWithDamageStat";
import AttributeCumulativeStat from "../controls/AttributeCumulativeStat";
import type {Character} from "../../../services/queries/character/GetCharacterCompleteQuery";

type Props = {
    sheet: Character;
}

const CharacterSheetStatsSection = ({sheet}: Props): any => {
    const bottomLinesStyle = {
        name: "Umanità",
        value: sheet?.humanity,
        maxValue: 10
    };

    return (
        <>
            <Grid item xs={12} sx={bottomLinesStyle}>
                <AttributeWithDamageStat stat={{
                    name: "Forza di Volontà",
                    value: sheet?.willpower,
                    maxValue: 10
                }} damage={sheet?.willpowerDamage} />
            </Grid>
            <Grid item xs={12} sx={bottomLinesStyle}>
                <AttributeWithDamageStat stat={{
                    name: "Salute",
                    value: sheet?.health,
                    maxValue: 10
                }} damage={sheet?.aggravatedDamage} secondDamage={sheet?.damage} />
            </Grid>
            <Grid item xs={12} sx={bottomLinesStyle}>
                <AttributeCumulativeStat stat={{
                    name: "Umanità",
                    value: sheet?.humanity,
                    maxValue: 10
                }} damage={sheet?.stains} />
            </Grid>
            <Grid item xs={12} sx={bottomLinesStyle}>
                <AttributeStat stat={{
                    name: "Fame",
                    value: sheet?.hunger,
                    maxValue: 5
                }} damage={sheet?.stains} />
            </Grid>
        </>
    );
}

export default CharacterSheetStatsSection;
