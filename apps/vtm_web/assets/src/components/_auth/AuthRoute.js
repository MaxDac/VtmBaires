// @flow

import React from "react";
import {Redirect, Route} from "react-router-dom";
import {getSessionSync} from "../../services/session-service";
import {Routes} from "../../AppRouter";

type Props = {
    component?: (...any) => any;
    children?: any;
}

const AuthRoute = ({ children, component, ...rest }: Props): any => {
    const user = getSessionSync()?.user;

    const loginRedirection = location => ({
        pathname: Routes.sessionExpired,
        state: { from: location }
    });

    const render = historyData => {
        const {location} = historyData;
        return user?.id != null
            ? children || component?.(historyData)
            : (<Redirect to={loginRedirection(location)}/>);
    }

    return (
        <Route {...rest} render={render} />
    )
}

export default AuthRoute;
