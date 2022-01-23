// @flow

import React from "react";
import {Navigate} from "react-router-dom";
import {AppRoutes} from "../../AppRouter";
import {getSessionSync} from "../../services/session-service";
import type {GenericReactComponent} from "../../_base/types";

type Props = {
    children?: any;
}

const RequireMasterAuth = ({children}: Props): GenericReactComponent => {
    const user = getSessionSync()?.user;

    return user?.id != null && user?.role === "MASTER"
        ? children
        : <Navigate to={AppRoutes.main} />;
}

export default RequireMasterAuth;
