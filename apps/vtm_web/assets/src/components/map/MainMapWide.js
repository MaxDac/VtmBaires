// @flow

import React from 'react';
import areas from "./map-settings.json";
import type {Map} from "../../services/base-types";
import MainMapImageMapper from "./MainMapImageMapper";

type Props = {
    maps: ?Array<Map>,
    onMapSelected: string => void;
}

const MainMapWide = ({maps, onMapSelected}: Props): any => {
    const onMapSelectedInternal = name => {
        const [selectedMap,] = maps?.filter(m => m.name === name) ?? [];

        if (selectedMap?.id != null) {
            onMapSelected(selectedMap.id);
        }
    };

    return (
        <MainMapImageMapper areas={areas}
                            onAreaSelected={onMapSelectedInternal} />
    );
};

export default MainMapWide;
