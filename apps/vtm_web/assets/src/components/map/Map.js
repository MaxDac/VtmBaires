// @flow

import React from 'react';
import SubMap from "./SubMap";
import useSectionMaps from "../../services/queries/map/SectionMapsQuery";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {mainMapsQuery} from "../../services/queries/map/MainMapsQuery";
import type {MainMapsQuery} from "../../services/queries/map/__generated__/MainMapsQuery.graphql";

type MapProps = {
    id: string;
}

const Map = ({ id }: MapProps): any => {
    const [map,] = useCustomLazyLoadQuery<MainMapsQuery>(mainMapsQuery, {})
        ?.mainMaps
        ?.filter(m => m?.id === id) ?? [];

    const maps = useSectionMaps(id);

    const getImageUrlName = name => {
        const fileName = name.toLowerCase().replace(" ", "-");
        return `/${fileName}.webp`;
    };

    const imageUrlName = () =>
        map?.name != null
            ? getImageUrlName(map.name)
            : "";

    return (<SubMap maps={maps} imageUrl={imageUrlName()} />);
};

export default Map;
