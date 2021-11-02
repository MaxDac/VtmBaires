// @flow

import React from 'react';
import {convert, mainMapsQuery} from "../../services/queries/map/MainMapsQuery";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../MainRouter";
import MainMapWide from './MainMapWide';
import {useMediaQuery, useTheme} from '@mui/material';
import MainMapResponsive from './MainMapResponsive';
import type {MainMapsQuery} from "../../services/queries/map/__generated__/MainMapsQuery.graphql";

export default function MainMap(): any {
    const theme = useTheme();
    const history = useHistory();
    const ret = useCustomLazyLoadQuery<MainMapsQuery>(mainMapsQuery, {});
    const maps = convert(ret);
    const showResponsive = useMediaQuery(theme.breakpoints.down('sm'));

    const onMapSelected = id => history.push(MainRoutes.subMap(id));

    if (showResponsive) {
        return (
            <MainMapResponsive maps={maps} onMapSelected={onMapSelected} />
        )
    }
    return (
        <MainMapWide maps={maps} onMapSelected={onMapSelected} />
    );
};
