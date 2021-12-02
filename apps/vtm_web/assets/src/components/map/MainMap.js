// @flow

import React, {useEffect} from 'react';
import {convert, mainMapsQuery} from "../../services/queries/map/MainMapsQuery";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../MainRouter";
import MainMapWide from './MainMapWide';
import {useMediaQuery, useTheme} from '@mui/material';
import MainMapResponsive from './MainMapResponsive';
import type {MainMapsQuery} from "../../services/queries/map/__generated__/MainMapsQuery.graphql";
import {useRelayEnvironment} from "react-relay";
import ResetSessionMapMutation from "../../services/mutations/sessions/ResetSessionMapMutation";

const MainMap = (): any => {
    const environment = useRelayEnvironment();
    const theme = useTheme();
    const history = useHistory();
    const ret = useCustomLazyLoadQuery<MainMapsQuery>(mainMapsQuery, {});
    const maps = convert(ret);
    const showResponsive = useMediaQuery(theme.breakpoints.down('sm'));

    const onMapSelected = id => history.push(MainRoutes.subMap(id));

    useEffect(() => {
        ResetSessionMapMutation(environment)
            .catch(ex => console.error("Error while updating session map", ex));
    }, [environment])

    if (showResponsive) {
        return (
            <MainMapResponsive maps={maps} onMapSelected={onMapSelected} />
        )
    }
    return (
        <MainMapWide maps={maps} onMapSelected={onMapSelected} />
    );
};

export default MainMap;
