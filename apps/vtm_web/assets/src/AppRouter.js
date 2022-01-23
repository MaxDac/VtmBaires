// @flow

import type {GenericReactComponent} from "./_base/types";

import React from "react";
import {Routes, Route} from "react-router-dom";

export type OpenDialogDelegate = (title: string, text: string, onOk: () => void, onCancel: ?() => void) => void;

export const AppRoutes = {
    splashScreen: "/",
    main: "/main",
    guideMain: "/guides",
    logout: "/logout",
    sessionExpired: "/session-expired"
};

const SplashScreen = React.lazy(() => import('./components/login/SplashScreen'));

const LoginRouter = React.lazy(() => import('./components/login/LoginRouter'));
const MainRouter = React.lazy(() => import('./components/MainRouter'));
const AdminRouter = React.lazy(() => import('./components/admin/AdminRouter'));
const GuidesRouter = React.lazy(() => import('./components/guides/GuidesRouter'));
const Logout = React.lazy(() => import('./components/logout/Logout'));

const AppRouter = (): GenericReactComponent => {
    return (
        <Routes>
            <Route exact path="/" element={<SplashScreen />} />
            <Route exact path="/logout" element={<Logout title="Logout effettuato con successo" />} />
            <Route exact path="/session-expired" element={<Logout title="Sessione Scaduta!" />} />
            <Route path="/access/*" element={<LoginRouter />} />
            <Route path="/main/*" element={<MainRouter />} />
            <Route path="/admin/*" element={<AdminRouter />} />
            <Route path="/guides/*" element={<GuidesRouter />} />
        </Routes>
    );
};

export default AppRouter;
