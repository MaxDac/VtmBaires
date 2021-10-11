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
    const singleRating = () => (
        <Rating name={stat.name}
                value={stat.value}
                readOnly
                icon={<FiberManualRecordIcon />}
                emptyIcon={<FiberManualRecordOutlinedIcon />} />
    );

    const doubleRating = () => {
        const [firstValue, secondValue] = [
            stat?.value >= 5 ? 5 : stat?.value,
            stat?.value <= 5 ? 0 : stat?.value - 5
        ];

        return (
            <>
                <Rating name={stat.name}
                        value={firstValue}
                        readOnly
                        icon={<FiberManualRecordIcon />}
                        emptyIcon={<FiberManualRecordOutlinedIcon />} />
                <Rating name={stat.name}
                        value={secondValue}
                        readOnly
                        icon={<FiberManualRecordIcon />}
                        emptyIcon={<FiberManualRecordOutlinedIcon />} />
            </>
        );
    }

    const rating = () =>
        stat?.maxValue > 5
            ? doubleRating()
            : singleRating();

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Typography>{stat.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {rating()}
                </Grid>
            </Grid>
        </>
    );
}

export default AttributeStat;
