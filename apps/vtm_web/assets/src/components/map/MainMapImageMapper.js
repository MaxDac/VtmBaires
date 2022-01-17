// @flow

import React, {useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ImageMapper from "react-img-mapper";
import Typography from "@mui/material/Typography";

export type MapAreas = {
    id?: string;
    shape: string;
    coords: number[];
    active?: boolean;
    disabled?: boolean;
    href?: string;
    fillColor?: string;
    strokeColor?: string;
    lineWidth?: number;
    preFillColor?: string;
};

type Props = {
    areas: Array<MapAreas>;
    onAreaSelected: ({ title: string }) => void;
}

export const mainMapWidth = 800;

export const mainMapHeight = 510;

const MainMapImageMapper = ({areas, onAreaSelected}: Props): any => {
    const [legend, setLegend] = useState("");

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
                                     onClick={onAreaSelected}
                                     onMouseEnter={onMouseEnter}
                                     onMouseLeave={onMouseLeave} />
                    </Box>
                    <Typography sx={{
                        fontFamily: "ThroughTheNight",
                        fontSize: "2rem",
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
