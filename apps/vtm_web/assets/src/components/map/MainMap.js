// @flow

import React from 'react';
import SubMap from "./SubMap";
import {convert, mainMapsQuery} from "../../services/queries/map/MainMapsQuery";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";

export default function MainMap(): any {
    const ret = useCustomLazyLoadQuery(mainMapsQuery, {});
    const maps = convert(ret);

    return (
        <SubMap maps={maps} imageUrl="main-map.webp" />
    );
};
