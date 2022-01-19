// @flow

import React from "react";
import LoginLayout from "./LoginLayout";
import {Route} from "react-router-dom";
import type {HomeLayoutProps} from "./LoginLayout";
import type {GenericReactComponent} from "../../_base/types";

export const LoginRoutes = {
    login: "/access/login",
    register: "/access/register",
    recoverPassword: "/access/recover-password",
    disclaimer: "/access/disclaimer",
}

type Props = HomeLayoutProps & {
    match: {
        url: string
    }
}

const Login = React.lazy(() => import('./Login'));
const CreateUser = React.lazy(() => import('./CreateUser'));
const RecoverPassword = React.lazy(() => import('./RecoverPassword'));
const Disclaimer = React.lazy(() => import('./Disclaimer'));

const LoginRouter = (props: Props): GenericReactComponent => {
    return (
        <LoginLayout {...props}>
            <Route exact path={`${props.match.url}/login`} component={Login} />
            <Route exact path={`${props.match.url}/register`} component={CreateUser} />
            <Route exact path={`${props.match.url}/recover-password`} component={RecoverPassword} />
            <Route exact path={`${props.match.url}/disclaimer`} component={Disclaimer} />
        </LoginLayout>
    );
}

export default LoginRouter;
