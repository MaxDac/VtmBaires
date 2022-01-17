// @flow

import React from "react";
import MainMapImageMapper from "../../map/MainMapImageMapper";
import {drawLine} from "./HavenMapAreas";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetHavensQuery} from "../../../services/queries/haven/__generated__/GetHavensQuery.graphql";
import {getHavensQuery} from "../../../services/queries/haven/GetHavensQuery";
import type {Haven} from "../../../services/queries/haven/GetHavensQuery";
import {getMapKeys} from "../../../_base/utils";

type Props = {

}

const groupHavens = (havens: $ReadOnlyArray<?Haven>): Map<number, Array<Haven>> => {
    const ret = new Map<number, Array<Haven>>();

    for (const haven of havens) {
        if (haven?.y != null) {
            const y = haven.y;
            if (ret.has(y)) {
                ret.get(y)?.push(haven);
            }
            else {
                ret.set(y, [haven]);
            }
        }
    }

    return ret;
}

const HavenMap = (props: Props): any => {
    const havens = useCustomLazyLoadQuery<GetHavensQuery>(getHavensQuery, {}, {
        fetchPolicy: "network-only"
    })?.getHavens?.result;

    const radius = 30;

    const onMapSelectedInternal = ({title}) => {
        console.debug("selected", title);
    };

    if (havens != null) {
        const groupedHavens = groupHavens(havens);
        const areas = getMapKeys(groupedHavens)
            .map(x => Number(x))
            .sort((a, b) => a - b)
            .flatMap(key => {
                const value = groupedHavens.get(key)?.sort((a, b) => (a?.x ?? 0) - (b?.x ?? 0));

                if (value != null) {
                    return drawLine(key - 1, value, radius);
                }

                return [];
            });

        return (
            <MainMapImageMapper areas={areas} onAreaSelected={onMapSelectedInternal} />
        );
    }

    // const areas = drawLine(0, 6, radius)
    //     .concat(drawLine(1, 6, radius))
    //     .concat(drawLine(2, 8, radius))
    //     .concat(drawLine(3, 9, radius))
    //     .concat(drawLine(4, 11, radius))
    //     .concat(drawLine(5, 10, radius))
    //     .concat(drawLine(6, 11, radius))
    //     .concat(drawLine(7, 11, radius))
    //     .concat(drawLine(8, 12, radius))
    //     .concat(drawLine(9, 12, radius))
    //     .concat(drawLine(10, 15, radius));
    //[
        //
        // buildArea("Test1", "#19791980", computeHexagonCoords([Math.round(x1 + d * 0.5), Math.round(y1 + d * cos30)], radius)),
    //];

    return (<></>);
}

export default HavenMap;
