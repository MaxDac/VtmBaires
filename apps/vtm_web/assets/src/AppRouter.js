// @flow

import React from "react";
import {Route, Switch} from "react-router-dom";
import type {History} from "./_base/types";
import 'suneditor/dist/css/suneditor.min.css';

export type OpenDialogDelegate = (title: string, text: string, onOk: () => void, onCancel: ?() => void) => void;

export const Routes = {
    splashScreen: "/",
    login: "/login",
    register: "/register",
    recoverPassword: "/recover-password",
    disclaimer: "/disclaimer",
    main: "/main",
    guideMain: "/guides"
};

export const AdminRoutes = {
    guides: "/admin/guides"
};

export const push = (history: History, routeKey: string): (Event => void) =>
    _ => history.push(Routes[routeKey]);

export const pushAdmin = (history: History, routeKey: string): (Event => void) =>
    _ => history.push(AdminRoutes[routeKey]);

const SplashScreen = React.lazy(() => import('./components/login/SplashScreen'));

const Login = React.lazy(() => import('./components/login/Login'));
const CreateUser = React.lazy(() => import('./components/login/CreateUser'));
const RecoverPassword = React.lazy(() => import('./components/login/RecoverPassword'));
const Disclaimer = React.lazy(() => import('./components/login/Disclaimer'));
const MainRouter = React.lazy(() => import('./components/MainRouter'));
const GuidesMain = React.lazy(() => import('./components/guides/GuidesMain'));

const AppRouter = (): any => {
    return (
        <Switch>
            <Route exact path="/" component={SplashScreen} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={CreateUser} />
            <Route exact path="/recover-password" component={RecoverPassword} />
            <Route exact path="/disclaimer" component={Disclaimer} />
            <Route path="/main" component={MainRouter} />
            <Route path="/guides" component={GuidesMain} />
        </Switch>
    );
};

export default AppRouter;
