// @flow

import React from "react";
import type {Map} from "../../services/base-types";
import SubMap from "./SubMap";

type Props = {
    maps: ?Array<Map>,
    onMapSelected: string => void;
}

const MainMapResponsive = ({maps, onMapSelected}: Props): any => {
    console.log("maps", maps);
    if (maps != null) {
        return (
            <SubMap maps={maps} imageUrl="main-map-responsive.png" />
        );
    }
    
    return (
        <img src="main-map-responsive.png" alt="Map Temp" />
    )
}

export default MainMapResponsive;
