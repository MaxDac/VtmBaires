// @flow

import {useMemo, useState} from "react";
import clansQuery from "../queries/info/clans-query";

import type {BaseInfo} from "../queries/base-types";

export function useClans(): BaseInfo[] {
    const [clans, setClans] = useState<BaseInfo[]>([]);

    useMemo(() =>
            clansQuery()
                .then(clans => setClans(_ => clans))
                .catch(error => console.log("Error while fetching clans", error))
    , []);

    return clans;
}
