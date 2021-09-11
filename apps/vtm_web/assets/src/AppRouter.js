// @flow

import React from "react";
import { Route, Switch } from "react-router";
import Login from './components/login/Login';
import CreateUser from "./components/login/CreateUser";
import Main from "./components/home/Main";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminGuides from "./components/admin/guides/AdminGuides";
import type {History} from "./_base/types";
import Creation1 from "./components/sheet/Creation1";
import 'suneditor/dist/css/suneditor.min.css';
import Creation2 from "./components/sheet/Creation2";
import Creation3 from "./components/sheet/Creation3";
import Map from "./components/map/Map";
import Chat from "./components/chat/Chat";
import MainMap from "./components/map/MainMap";

export type OpenDialogDelegate = (title: string, text: string, onOk: () => void, onCancel: ?() => void) => void;

type AlertLayoutParams = {
    setError: (string, ?string) => void;
    openDialog: OpenDialogDelegate;
}

export const Routes = {
    login: "/login",
    register: "/register",
    main: "/",
    admin: "/admin",
    creation1: "/creation/1",
    creation2: "/creation/2",
    creation3: "/creation/3",
    mainMap: "/map",
    subMap: (id: string): string => `/map/${id}`,
    chat: (id: string): string => `/chat/${id}`
};

export const AdminRoutes = {
    guides: "/admin/guides"
};

export const push = (history: History, routeKey: string): (Event => void) =>
    _ => history.push(Routes[routeKey]);

export const pushAdmin = (history: History, routeKey: string): (Event => void) =>
    _ => history.push(AdminRoutes[routeKey]);

const AppRouter = ({
    setError,
    openDialog
}: AlertLayoutParams): any =>
    <Switch>
        <Route exact path="/login" component={() => <Login setError={setError} openDialog={openDialog} />} />
        <Route exact path="/register" component={() => <CreateUser setError={setError} openDialog={openDialog} />} />
        <Route exact path="/" component={() => <Main setError={setError} openDialog={openDialog} />} />

        <Route exact path="/creation/1" component={() => <Creation1 setError={setError} openDialog={openDialog} />} />
        <Route exact path="/creation/2" component={() => <Creation2 setError={setError} openDialog={openDialog} />} />
        <Route exact path="/creation/3" component={() => <Creation3 setError={setError} openDialog={openDialog} />} />

        <Route exact path="/map" component={() => <MainMap setError={setError} openDialog={openDialog} />} />
        <Route exact path="/map/:id" component={({match: {params: {id}}}) => <Map setError={setError} openDialog={openDialog} id={id} />} />
        <Route exact path="/chat/:id" component={({match: {params: {id}}}) => <Chat setError={setError} openDialog={openDialog} id={id} />} />

        <Route exact path="/admin/guides" component={AdminGuides} />
        <Route exact path="/admin" component={() => <AdminDashboard setError={setError} openDialog={openDialog} />} />
    </Switch>;

export default AppRouter;
