// @flow

import React from "react";
import {Route, Switch} from "react-router-dom";
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
import Creation4 from "./components/sheet/Creation4";
import CharacterSheet from "./components/sheet/CharacterSheet";
import AuthRoute from "./components/_auth/AuthRoute";
import Creation5 from "./components/sheet/creation5";

export type OpenDialogDelegate = (title: string, text: string, onOk: () => void, onCancel: ?() => void) => void;

export const Routes = {
    login: "/login",
    register: "/register",
    main: "/",
    admin: "/admin",
    creation1: "/creation/1",
    creation2: "/creation/2",
    creation3: "/creation/3",
    creation4: "/creation/4",
    creation5: "/creation/5",
    creationBase: "/creation/",
    mainMap: "/map",
    sheet: (id?: ?string): string => id != null ? `/sheet/${id}` : "/sheet",
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

const AppRouter = (): any => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={CreateUser} />

            <AuthRoute exact path="/" component={() => <Main />} />

            <AuthRoute exact path="/creation/1" component={() => <Creation1 />} />
            <AuthRoute exact path="/creation/2" component={() => <Creation2 />} />
            <AuthRoute exact path="/creation/3" component={() => <Creation3 />} />
            <AuthRoute exact path="/creation/4" component={() => <Creation4 />} />
            <AuthRoute exact path="/creation/5" component={() => <Creation5 />} />

            <AuthRoute exact path="/sheet" component={() => <CharacterSheet />} />
            <AuthRoute exact path="/sheet/:id" component={({match: {params: {id}}}) => <CharacterSheet id={id} />} />

            <AuthRoute exact path="/map" component={() => <MainMap />} />
            <AuthRoute exact path="/map/:id" component={({match: {params: {id}}}) => <Map id={id} />} />
            <AuthRoute exact path="/chat/:id" component={({match: {params: {id}}}) => <Chat id={id} />} />

            <AuthRoute exact path="/admin/guides" component={() => <AdminGuides />} />
            <AuthRoute exact path="/admin" component={() => <AdminDashboard />} />
        </Switch>
    );
};

export default AppRouter;
