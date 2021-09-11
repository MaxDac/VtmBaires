// @flow

import React from 'react';
import SubMap from "./SubMap";
import {usePreloadedQuery} from "react-relay";
import {mainMapsQuery, preloadedMainMapsQuery} from "../../services/queries/chat/ChatQueries";
import type {OpenDialogDelegate} from "../../AppRouter";
import type {DefaultComponentProps} from "../../_base/types";

const MainMap = ({ setError, openDialog }: DefaultComponentProps): any => {
    const { mainMaps: data } = usePreloadedQuery(mainMapsQuery, preloadedMainMapsQuery);
    return (<SubMap setError={setError} openDialog={openDialog} maps={data} />);
};

export default MainMap;
