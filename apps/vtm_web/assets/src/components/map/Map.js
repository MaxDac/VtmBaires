// @flow

import React from 'react';
import {useMaps} from "../../services/hooks/useMaps";
import SubMap from "./SubMap";
import type {DefaultComponentProps} from "../../_base/types";

type MapProps = DefaultComponentProps & {
    id: string;
}

const Map = ({ setError, openDialog, id }: MapProps): any => {
    const maps = useMaps(id);
    return (<SubMap setError={setError} openDialog={openDialog} maps={maps} />);
};

export default Map;
