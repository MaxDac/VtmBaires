// @flow

import {useMemo, useState} from "react";
import {mapQueryPromise, mapsQueryPromise} from "../queries/chat/ChatQueries";
import type {MapLocation, MapLocationSlim} from "../queries/chat/ChatQueries";

export function useMaps(id: string): Array<MapLocationSlim> {
    const [maps, setMaps] = useState<Array<MapLocationSlim>>([]);

    useMemo(() =>
        mapsQueryPromise(id)
            .then(ms => setMaps(_ => ms))
            .catch(error => console.log("Error while fetching maps", error)), [id]);

    return maps;
}

export function useMap(id: string): ?MapLocation {
    const [map, setMap] = useState<?MapLocation>(null);

    useMemo(() =>
        mapQueryPromise(id)
            .then(m => setMap(_ => m))
            .catch(error => console.log("Error while fetching map", error)), [id]);

    return map;
}
