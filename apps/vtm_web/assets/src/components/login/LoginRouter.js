// @flow

import React from "react";
import {Routes, Route} from "react-router-dom";
import type {GenericReactComponent} from "../../_base/types";

export const LoginRoutes = {
    login: "/access/login",
    register: "/access/register",
    recoverPassword: "/access/recover-password",
    disclaimer: "/access/disclaimer",
}

const Login = React.lazy(() => import('./Login'));
const CreateUser = React.lazy(() => import('./CreateUser'));
const RecoverPassword = React.lazy(() => import('./RecoverPassword'));
const Disclaimer = React.lazy(() => import('./Disclaimer'));

const LoginRouter = (): GenericReactComponent => {
    return (
        <Routes>
            <Route exact path="login" element={<Login />} />
            <Route exact path="register" element={<CreateUser />} />
            <Route exact path="recover-password" element={<RecoverPassword />} />
            <Route exact path="disclaimer" element={<Disclaimer />} />
        </Routes>
    );
}

export default LoginRouter;
