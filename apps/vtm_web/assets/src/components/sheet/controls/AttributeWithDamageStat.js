// @flow

import React from "react";
import type {Stat} from "../../../services/queries/character/GetCharacterStatsQuery";
import Rating from '@mui/material/Rating';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type Props = {
    stat: Stat;
    damage: number;
    secondDamage?: number;
}

const AttributeWithDamageStat = ({stat, damage, secondDamage}: Props): any => {
    const parsedSecondDamage = secondDamage ?? 0;

    const realValue = stat.value - damage - parsedSecondDamage;

    const realMaxValue = stat.maxValue - realValue - damage;

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Typography>{stat.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Rating name={stat.name}
                            value={realValue}
                            readOnly
                            icon={<FiberManualRecordIcon />}
                            emptyIcon={<FiberManualRecordOutlinedIcon />}
                            max={realValue} />
                    <Rating name={stat.name}
                            value={damage}
                            readOnly
                            icon={<FiberManualRecordTwoToneIcon />}
                            emptyIcon={<FiberManualRecordOutlinedIcon />}
                            max={damage} />
                    <Rating name={stat.name}
                            value={secondDamage}
                            readOnly
                            icon={<FiberManualRecordTwoToneIcon />}
                            emptyIcon={<FiberManualRecordOutlinedIcon />}
                            sx={{color: "#C92929"}}
                            max={realMaxValue} />
                </Grid>
            </Grid>
        </>
    );
}

export default AttributeWithDamageStat;
