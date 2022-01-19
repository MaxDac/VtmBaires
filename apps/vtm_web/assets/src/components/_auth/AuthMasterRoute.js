// @flow

import React from "react";
import {Redirect, Route} from "react-router-dom";
import {Routes} from "../../AppRouter";
import {getSessionSync} from "../../services/session-service";
import type {GenericReactComponent} from "../../_base/types";

type Props = {
    component?: (...any) => any;
    children?: any;
}

const AuthMasterRoute = ({ children, component, ...rest }: Props): GenericReactComponent => {
    const user = getSessionSync()?.user;

    const loginRedirection = location => ({
        pathname: Routes.main,
        state: { from: location }
    });

    const render = historyData => {
        const {location} = historyData;
        return user?.id != null && user?.role === "MASTER"
            ? children || component?.(historyData)
            : (<Redirect to={loginRedirection(location)}/>);
    }

    return (
        <Route {...rest} render={render} />
    )
}

export default AuthMasterRoute;
