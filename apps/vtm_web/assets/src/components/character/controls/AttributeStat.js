// @flow

import React from "react";
import type {StatWithoutId} from "../../../services/queries/character/GetCharacterStatsQuery";
import Rating from '@mui/material/Rating';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {mainFontFamily} from "../../Main.Layout.Style";
import type {GenericReactComponent} from "../../../_base/types";

type Props = {
    stat: StatWithoutId
}

export const attributeFullPointStyle = {
    color: "secondary.light"
};

export const attributeEmptyPointStyle = {
    color: "primary.dark"
}

const AttributeStat = ({stat}: Props): GenericReactComponent => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Typography sx={mainFontFamily}>
                        {stat.name}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Rating name={stat.name}
                            value={stat.value}
                            readOnly
                            icon={<FiberManualRecordIcon sx={attributeFullPointStyle} />}
                            emptyIcon={<FiberManualRecordOutlinedIcon sx={attributeEmptyPointStyle} />}
                            max={stat.maxValue} />
                </Grid>
            </Grid>
        </>
    );
}

export default AttributeStat;
