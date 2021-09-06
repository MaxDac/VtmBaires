// @flow

import {useEffect, useMemo, useState} from "react";
import clansQuery from "../../services/queries/info/clans-query";

import type { Clan, ClansResponse } from "../../services/queries/info/clans-query";

export function useClans(): Clan[] {
    const [clans, setClans] = useState<Clan[]>([]);

    useMemo(() =>
            clansQuery()
                .then(({ clans }) => setClans(_ => clans))
                .catch(error => console.log("Error while fetching clans", error))
    , []);

    return clans;
}
