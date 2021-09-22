// @flow

import React, {useContext} from "react";
import {SessionContext} from "../../App";
import {Redirect, Route} from "react-router-dom";
import {Routes} from "../../AppRouter";

type Props = {
    component?: (...any) => any;
    children?: any;
}

const AuthRoute = ({ children, component, ...rest }: Props): any => {
    const user = useContext(SessionContext)?.getUser();

    const loginRedirection = location => ({
        pathname: Routes.login,
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
