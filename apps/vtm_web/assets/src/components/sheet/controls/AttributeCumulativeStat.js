// @flow

import React from "react";
import type {StatWithoutId} from "../../../services/queries/character/GetCharacterStatsQuery";
import Rating from '@mui/material/Rating';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type Props = {
    stat: StatWithoutId;
    damage: number;
}

const AttributeCumulativeStat = ({stat, damage}: Props): any => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Typography>{stat.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Rating name={stat.name}
                            value={stat.value}
                            readOnly
                            icon={<FiberManualRecordIcon />}
                            emptyIcon={<FiberManualRecordOutlinedIcon />}
                            max={stat.value} />
                    <Rating name={stat.name}
                            value={damage}
                            readOnly
                            icon={<ClearIcon />}
                            emptyIcon={<FiberManualRecordOutlinedIcon />}
                            sx={{color: "#C92929"}}
                            max={(stat.maxValue ?? 0) - (stat.value ?? 0)} />
                </Grid>
            </Grid>
        </>
    );
}

export default AttributeCumulativeStat;
