// @flow

import React, {useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ImageMapper from "react-img-mapper";
import Typography from "@mui/material/Typography";
import type {Haven} from "../../services/queries/haven/GetHavensQuery";
import type {MapAreas} from "../haven/controls/haven-map-areas-helpers";

type Props = {
    areas: Array<MapAreas>;
    onAreaSelected: Haven => void;
}

export const mainMapWidth = 800;

export const mainMapHeight = 510;

const MainMapImageMapper = ({areas, onAreaSelected}: Props): any => {
    const [legend, setLegend] = useState("");

    const legendFontSize = () => {
        if (legend.length > 40) {
            return "1.5rem";
        }
        else {
            return "2rem";
        }
    }

    const map = {
        name: "haven-map",
        areas: areas
    };

    const onMouseEnter = ({title}) => {
        setLegend(_ => title);
    };

    const onMouseLeave = _ => {
        setLegend(_ => "");
    };

    const onAreaSelectedInternal = ({haven}: MapAreas) => onAreaSelected(haven);

    return (
        <Box component="div" sx={{display: "inline-flex", width: "100%"}}>
            <Paper component="div" variant="outlined" sx={{
                margin: "0 auto",
                width: `${(mainMapWidth + 2)}px`,
                height: `${(mainMapHeight + 58)}px`,
                textAlign: "center"
            }}>
                <Stack>
                    <Box sx={{cursor: "pointer"}}>
                        <ImageMapper src="main-map.webp"
                                     map={map}
                                     onClick={onAreaSelectedInternal}
                                     onMouseEnter={onMouseEnter}
                                     onMouseLeave={onMouseLeave} />
                    </Box>
                    <Typography sx={{
                        fontFamily: "ThroughTheNight",
                        fontSize: legendFontSize(),
                        margin: "0 auto"
                    }}>
                        {legend}
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default MainMapImageMapper;
