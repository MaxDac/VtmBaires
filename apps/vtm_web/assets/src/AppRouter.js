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

export const Routes = new Map([
    ["login", "/login"],
    ["register", "/register"],
    ["main", "/"],
    ["admin", "/admin"],
    ["creation1", "/creation/1"]
]);

export const AdminRoutes = new Map([
    ["guides", "/admin/guides"]
]);

export const push = (history: History, routeKey: string) =>
    _ => history.push(Routes.get(routeKey));

export const pushAdmin = (history: History, routeKey: string) =>
    _ => history.push(AdminRoutes.get(routeKey));

const AppRouter = ({
    setError
}) => 
    <Switch>
        <Route exact path="/login" component={() => <Login setError={setError} />} />
        <Route exact path="/register" component={() => <CreateUser setError={setError} />} />
        <Route exact path="/" component={Main} />

        <Route exact path="/creation/1" component={() => <Creation1 setError={setError} />} />

        <Route exact path="/admin/guides" component={AdminGuides} />
        <Route exact path="/admin" component={() => <AdminDashboard setError={setError} />} />
    </Switch>;

export default AppRouter;
