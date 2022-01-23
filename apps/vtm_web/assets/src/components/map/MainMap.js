// @flow

import React, {useEffect} from 'react';
import {convert, mainMapsQuery} from "../../services/queries/map/MainMapsQuery";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {useNavigate} from "react-router-dom";
import {MainRoutes} from "../MainRouter";
import MainMapWide from './components/MainMapWide';
import {useMediaQuery, useTheme} from '@mui/material';
import MainMapResponsive from './components/MainMapResponsive';
import type {MainMapsQuery} from "../../services/queries/map/__generated__/MainMapsQuery.graphql";
import {useRelayEnvironment} from "react-relay";
import ResetSessionMapMutation from "../../services/mutations/sessions/ResetSessionMapMutation";
import type {GenericReactComponent} from "../../_base/types";
import RequireAuth from "../_auth/RequireAuth";
import RouterPage from "../RouterPage";

const MainMap = (): GenericReactComponent => {
    const environment = useRelayEnvironment();
    const theme = useTheme();
    const navigate = useNavigate();
    const ret = useCustomLazyLoadQuery<MainMapsQuery>(mainMapsQuery, {});
    const maps = convert(ret);
    const showResponsive = useMediaQuery(theme.breakpoints.down('sm'));

    const onMapSelected = id => navigate(MainRoutes.subMap(id));

    useEffect(() => {
        ResetSessionMapMutation(environment)
            .catch(ex => console.error("Error while updating session map", ex));
    }, [environment])

    const show = () => {
        if (showResponsive) {
            return (
                <MainMapResponsive maps={maps} onMapSelected={onMapSelected}/>
            )
        }

        return (
            <MainMapWide maps={maps} onMapSelected={onMapSelected}/>
        );
    }

    return (
        <RequireAuth>
            <RouterPage>
                {show()}
            </RouterPage>
        </RequireAuth>
    );
};

export default MainMap;
