// @flow

import React, {useState} from 'react';
import Box from "@mui/material/Box";
import ImageMapper from 'react-img-mapper';
import areas from "./map-settings.json";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import type {Map} from "../../services/base-types";

type Props = {
    maps: ?Array<Map>,
    onMapSelected: string => void;
}

const MainMapWide = ({maps, onMapSelected}: Props): any => {
    const [legend, setLegend] = useState("");

    const map = {
        name: "main-map",
        areas: areas
    };

    const onMouseEnter = ({title}) => {
        setLegend(_ => title);
    };

    const onMouseLeave = _ => {
        setLegend(_ => "");
    };

    const onMapSelectedInternal = ({title}) => {
        const [selectedMap,] = maps?.filter(m => m.name === title) ?? [];

        if (selectedMap?.id != null) {
            onMapSelected(selectedMap.id);
        }
    };

    return (
        <Box component="div">
            <Box component="div" sx={{
                margin: "0 auto",
                width: "800px",
                minWidth: "800px"
            }}>
                <Stack>
                    <ImageMapper src="main-map.webp"
                                 map={map}
                                 onClick={onMapSelectedInternal}
                                 onMouseEnter={onMouseEnter}
                                 onMouseLeave={onMouseLeave} />
                    <Typography sx={{
                        fontFamily: "Disturbed",
                        fontSize: "2rem",
                        margin: "0 auto"
                    }}>
                        {legend}
                    </Typography>
                </Stack>
            </Box>
        </Box>
        // <SubMap maps={maps} imageUrl="/main-map.png" />
    );
}

export default MainMapWide;
