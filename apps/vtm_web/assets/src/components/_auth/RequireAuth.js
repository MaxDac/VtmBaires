// @flow

import React from "react";
import {Navigate} from "react-router-dom";
import {getSessionSync} from "../../services/session-service";
import {AppRoutes} from "../../AppRouter";
import type {GenericReactComponent} from "../../_base/types";

type Props = {
    children?: any;
};

const RequireAuth = ({children}: Props): GenericReactComponent => {
    const user = getSessionSync()?.user;

    console.debug("user", user);

    return user?.id != null
        ? children
        : <Navigate to={AppRoutes.sessionExpired} />;
}

export default RequireAuth;
