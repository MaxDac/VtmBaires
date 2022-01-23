// @flow

import React from 'react';
import SubMap from "./components/SubMap";
import useSectionMaps from "../../services/queries/map/SectionMapsQuery";
import {useUpdateSessionMap} from "../_hooks/useUpdateSessionMap";
import useMap from "../../services/queries/map/MapQuery";
import {replaceAll, stripAccents} from "../../_base/utils";
import type {GenericReactComponent} from "../../_base/types";
import {useParams} from "react-router-dom";
import RequireAuth from "../_auth/RequireAuth";
import RouterPage from "../RouterPage";

const Map = (): GenericReactComponent => {
    const {id} = useParams();
    useUpdateSessionMap(id);

    const map = useMap(id);

    const maps = useSectionMaps(id);

    const getImageUrlName = name => {
        const fileName = stripAccents(replaceAll(name.toLowerCase(), " ", "-"));
        return `/${fileName}.webp`;
    };

    const imageUrlName = () =>
        map?.name != null
            ? getImageUrlName(map.name)
            : "";

    return (
        <RequireAuth>
            <RouterPage>
                <SubMap maps={maps} imageUrl={imageUrlName()} />
            </RouterPage>
        </RequireAuth>
    );
};

export default Map;
