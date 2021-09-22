// @flow

import React from 'react';
import SubMap from "./SubMap";
import useSectionMaps from "../../services/queries/map/SectionMapsQuery";

type MapProps = {
    id: string;
}

const Map = ({ id }: MapProps): any => {
    const maps = useSectionMaps(id);
    return (<SubMap maps={maps} />);
};

export default Map;
