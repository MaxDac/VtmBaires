// @flow

import React from 'react';
import SubMap from "./SubMap";
import useMainMaps, {convert, mainMapsQuery} from "../../services/queries/map/MainMapsQuery";
import {log} from "../../_base/utils";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";

export default function MainMap(): any {
    // const maps = useMainMaps();
    const ret = useCustomLazyLoadQuery(mainMapsQuery, {});
    log("ret", ret);
    const maps = convert(ret);

    return (<SubMap maps={maps} />);
};
