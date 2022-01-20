// @flow

import React from "react";
import MainMapImageMapper from "../map/MainMapImageMapper";
import {drawLine, groupHavens} from "./haven-map-areas-helpers";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import type {GetHavensQuery} from "../../services/queries/haven/__generated__/GetHavensQuery.graphql";
import {getHavensQuery} from "../../services/queries/haven/GetHavensQuery";
import type {Haven} from "../../services/queries/haven/GetHavensQuery";
import {getMapKeys} from "../../_base/utils";
import {useSession} from "../../services/session-service";
import type {GenericReactComponent} from "../../_base/types";

type Props = {
    onSectionSelected: (Haven | string) => void;
    fetchKey?: number;
    setPersonalHaven?: string => void;
}

const sendPersonalHaven = (characterId, havens, setPersonalHaven) => {
    if (setPersonalHaven != null) {
        const [personalHaven,] = havens?.filter(h => h?.character?.id === characterId) ?? [];

        if (personalHaven?.id != null) {
            setPersonalHaven(personalHaven.id);
        }
    }
};

const HavenMap = ({onSectionSelected, fetchKey, setPersonalHaven}: Props): GenericReactComponent => {
    const [,character] = useSession();
    const havens = useCustomLazyLoadQuery<GetHavensQuery>(getHavensQuery, {}, {
        fetchPolicy: "network-only",
        fetchKey: fetchKey
    })?.getHavens?.result;

    const radius = 20.8;

    sendPersonalHaven(character?.id, havens, setPersonalHaven);

    const onMapSelectedInternal = (haven: Haven | string) =>
        onSectionSelected(haven);

    if (havens != null) {
        const groupedHavens = groupHavens(havens);
        const areas = getMapKeys(groupedHavens)
            .map(x => Number(x))
            .sort((a, b) => a - b)
            .flatMap(key => {
                const value = groupedHavens
                    .get(key)
                    ?.sort((a, b) => (a?.x ?? 0) - (b?.x ?? 0));

                if (value != null) {
                    return drawLine(character?.id, key - 1, value, radius);
                }

                return [];
            });

        return (
            <MainMapImageMapper areas={areas}
                                onAreaSelected={onMapSelectedInternal} />
        );
    }

    return (<></>);
}

export default HavenMap;
