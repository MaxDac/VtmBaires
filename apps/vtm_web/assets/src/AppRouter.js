// @flow

import React from "react";
import {Route, Switch} from "react-router-dom";
import type {History} from "./_base/types";
import 'suneditor/dist/css/suneditor.min.css';
import AuthRoute from "./components/_auth/AuthRoute";
import AuthMasterRoute from "./components/_auth/AuthMasterRoute";

export type OpenDialogDelegate = (title: string, text: string, onOk: () => void, onCancel: ?() => void) => void;

export const Routes = {
    login: "/login",
    register: "/register",
    recoverPassword: "/recover-password",
    main: "/",
    creation1: "/creation/1",
    creation2: "/creation/2",
    creation3: "/creation/3",
    creation4: "/creation/4",
    creation5: "/creation/5",
    creationBase: "/creation/",
    settings: "/settings",
    messages: "/messages",
    sentMessages: "/messages/sent",
    readMessage: (id: string): string => `/message/${id}`,
    newMessage: (id?: string): string => id ? `/message/new/${id}` : "/message/new",
    forumSections: "/forum",
    forumSection: (sectionId: string): string => `/forum/${sectionId}`,
    forumThread: (threadId: string): string => `/forum/thread/${threadId}`,
    createNewForumThread: (sectionId: string): string => `/forum/${sectionId}/thread/new`,
    createNewForumPost: (threadId: string): string => `/forum/thread/${threadId}/post/new`,
    mainMap: "/map",

    sheet: (id?: ?string, reload?: ?boolean): string =>
        id != null
            ? (reload === true ? `/sheet/${id}/reload` : `/sheet/${id}`)
            : "/sheet",
    modifySheet: (id: string): string => `/sheet/modify/${id}`,
    subMap: (id: string): string => `/map/${id}`,
    chat: (id: string): string => `/chat/${id}`,

    admin: "/admin",
    charactersList: "/admin/characters",
    unapprovedCharacters: "/admin/unapproved",
    characterDashboard: (id: string) => `/admin/character/${id}`,
    createNewNpc: "/admin/npc/new"
};

export const AdminRoutes = {
    guides: "/admin/guides"
};

export const push = (history: History, routeKey: string): (Event => void) =>
    _ => history.push(Routes[routeKey]);

export const pushAdmin = (history: History, routeKey: string): (Event => void) =>
    _ => history.push(AdminRoutes[routeKey]);

const Login = React.lazy(() => import('./components/login/Login'));
const CreateUser = React.lazy(() => import('./components/login/CreateUser'));
const RecoverPassword = React.lazy(() => import('./components/login/RecoverPassword'));

const Main = React.lazy(() => import('./components/Main'));
const Creation1 = React.lazy(() => import('./components/sheet/creation/Creation1'));
const Creation2 = React.lazy(() => import('./components/sheet/creation/Creation2'));
const Creation3 = React.lazy(() => import('./components/sheet/creation/Creation3'));
const Creation4 = React.lazy(() => import('./components/sheet/creation/Creation4'));
const Creation5 = React.lazy(() => import('./components/sheet/creation/Creation5'));

const CharacterSheet = React.lazy(() => import('./components/sheet/CharacterSheet'));
const ModifyCharacterSheet: any = React.lazy(() => import('./components/sheet/sheet-sections/ModifyCharacterSheet'));

const MainMap = React.lazy(() => import('./components/map/MainMap'));
const Map: any = React.lazy(() => import('./components/map/Map'));
const Chat = React.lazy(() => import('./components/chat/Chat'));

const Settings = React.lazy(() => import('./components/settings/Settings'));
const ReceivedMessages = React.lazy(() => import('./components/messages/ReceivedMessages'));
const SentMessages = React.lazy(() => import('./components/messages/SentMessages'));
const NewMessage: any = React.lazy(() => import('./components/messages/NewMessage'));
const ReadMessage: any = React.lazy(() => import('./components/messages/ReadMessage'));

const ForumSections = React.lazy(() => import('./components/forum/ForumSections'));
const CreateNewThread = React.lazy(() => import('./components/forum/forms/CreateNewThread'));
const CreateNewPost = React.lazy(() => import('./components/forum/forms/CreateNewPost'));
const ForumThread = React.lazy(() => import('./components/forum/ForumThread'));
const ForumSection = React.lazy(() => import('./components/forum/ForumSection'));

const AdminGuides = React.lazy(() => import('./components/admin/guides/AdminGuides'));
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'));
const CharactersList = React.lazy(() => import('./components/admin/characters/CharactersList'));
const CharacterDashboard = React.lazy(() => import('./components/admin/characters/CharacterDashboard'));
const UnapprovedCharacters = React.lazy(() => import('./components/admin/approvation/UnapprovedCharacters'));
const CreateNewNpc = React.lazy(() => import('./components/sheet/npcs/CreateNewNpc'));

const AppRouter = (): any => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={CreateUser} />
            <Route exact path="/recover-password" component={RecoverPassword} />

            <AuthRoute exact path="/" component={() => <Main />} />

            <AuthRoute exact path="/creation/1" component={() => <Creation1 />} />
            <AuthRoute exact path="/creation/2" component={() => <Creation2 />} />
            <AuthRoute exact path="/creation/3" component={() => <Creation3 />} />
            <AuthRoute exact path="/creation/4" component={() => <Creation4 />} />
            <AuthRoute exact path="/creation/5" component={() => <Creation5 />} />

            <AuthRoute exact path="/sheet/modify/:id" component={({match: {params: {id}}}) => <ModifyCharacterSheet id={id} />} />
            <AuthRoute exact path="/sheet" component={() => <CharacterSheet />} />
            <AuthRoute exact path="/sheet/:id/reload" component={({match: {params: {id}}}) => <CharacterSheet id={id} reload={true} />} />
            <AuthRoute exact path="/sheet/:id" component={({match: {params: {id}}}) => <CharacterSheet id={id} />} />

            <AuthRoute exact path="/map" component={() => <MainMap />} />
            <AuthRoute exact path="/map/:id" component={({match: {params: {id}}}) => <Map id={id} />} />
            <AuthRoute exact path="/chat/:id" component={({match: {params: {id}}}) => <Chat id={id} />} />

            <AuthRoute exact path="/settings" component={() => <Settings />} />

            <AuthRoute exact path="/messages" component={() => <ReceivedMessages />} />
            <AuthRoute exact path="/messages/sent" component={() => <SentMessages />} />
            <AuthRoute exact path="/message/new" component={() => <NewMessage />} />
            <AuthRoute exact path="/message/new/:id" component={({match: {params: {id}}}) => <NewMessage replyMessageId={id} />} />
            <AuthRoute exact path="/message/:id" component={({match: {params: {id}}}) => <ReadMessage messageId={id} />} />

            <AuthRoute exact path="/forum" component={() => <ForumSections />} />
            <AuthRoute exact path="/forum/:id/thread/new" component={({match: {params: {id}}}) => <CreateNewThread sectionId={id} />} />
            <AuthRoute exact path="/forum/thread/:id/post/new" component={({match: {params: {id}}}) => <CreateNewPost threadId={id} />} />
            <AuthRoute exact path="/forum/thread/:id" component={({match: {params: {id}}}) => <ForumThread threadId={id} />} />
            <AuthRoute exact path="/forum/:id" component={({match: {params: {id}}}) => <ForumSection sectionId={id} />} />

            <AuthMasterRoute exact path="/admin/guides" component={() => <AdminGuides />} />
            <AuthMasterRoute exact path="/admin" component={() => <AdminDashboard />} />
            <AuthMasterRoute exact path="/admin/characters" component={() => <CharactersList />} />
            <AuthMasterRoute exact path="/admin/character/:id" component={({match: {params: {id}}}) => <CharacterDashboard characterId={id} />} />
            <AuthMasterRoute exact path="/admin/unapproved" component={() => <UnapprovedCharacters />} />
            <AuthMasterRoute exact path="/admin/npc/new" component={() => <CreateNewNpc />} />
        </Switch>
    );
};

export default AppRouter;
