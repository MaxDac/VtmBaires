// @flow

import React from "react";
import type {Stat} from "../../../services/queries/character/GetCharacterStatsQuery";
import Rating from '@mui/material/Rating';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type Props = {
    stat: Stat
}

const AttributeStat = ({stat}: Props): any => {
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
                            emptyIcon={<FiberManualRecordOutlinedIcon />} />
                </Grid>
            </Grid>
        </>
    );
}

export default AttributeStat;
