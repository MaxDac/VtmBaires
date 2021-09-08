// @flow

import React from "react";
import { Route, Switch } from "react-router";
import Login from './components/home/Login';
import CreateUser from "./components/home/CreateUser";
import Main from "./components/main/Main";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminGuides from "./components/admin/guides/AdminGuides";
import type {History} from "./_base/types";
import Creation1 from "./components/sheet/Creation1";
import 'suneditor/dist/css/suneditor.min.css';
import Creation2 from "./components/sheet/Creation2";
import Creation3 from "./components/sheet/Creation3";

export const Routes = {
    login: "/login",
    register: "/register",
    main: "/",
    admin: "/admin",
    creation1: "/creation/1",
    creation2: "/creation/2",
    creation3: "/creation/3"
};

export const AdminRoutes = {
    guides: "/admin/guides"
};

export type AppRouterParams = {
    setError: (string, string) => void;
}

export const push = (history: History, routeKey: string): (Event => void) =>
    _ => history.push(Routes[routeKey]);

export const pushAdmin = (history: History, routeKey: string): (Event => void) =>
    _ => history.push(AdminRoutes[routeKey]);

const AppRouter = ({
    setError
}: AppRouterParams): any =>
    <Switch>
        <Route exact path="/login" component={() => <Login setError={setError} />} />
        <Route exact path="/register" component={() => <CreateUser setError={setError} />} />
        <Route exact path="/" component={Main} />

        <Route exact path="/creation/1" component={() => <Creation1 setError={setError} />} />
        <Route exact path="/creation/2" component={() => <Creation2 setError={setError} />} />
        <Route exact path="/creation/3" component={() => <Creation3 setError={setError} />} />

        <Route exact path="/admin/guides" component={AdminGuides} />
        <Route exact path="/admin" component={() => <AdminDashboard setError={setError} />} />
    </Switch>;

export default AppRouter;
