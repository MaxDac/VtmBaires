// @flow

import React from "react";
import AdminHavenEvents from "./havens/AdminHavenEvents";
import {Routes, Route} from "react-router-dom";
import MainLayout from "../MainLayout";

export const AdminRoutes = {
    admin: "/admin",
    unapprovedCharacters: "/admin/unapproved",
    characterDashboard: (id: string): string => `/admin/character/${id}`,
    createNewNpc: "/admin/npc/new",
    defineNpc: (id: string): string => `/admin/npc/${id}/define`,
    adminHavens: "/admin/havens",
    chatViewer: "/admin/chat",
    adminHavenEvents: "/admin/haven-events"
};

const CharacterDashboard = React.lazy(() => import('./characters/CharacterDashboard'));
const UnapprovedCharacters = React.lazy(() => import('./approvation/UnapprovedCharacters'));
const CreateNewNpc = React.lazy(() => import('../character/npcs/CreateNewNpc'));
const DefineNpc = React.lazy(() => import('../character/npcs/DefineNpc'));
const AdminHavens = React.lazy(() => import('./havens/AdminHavens'));
const ChatViewer = React.lazy(() => import('./chat/ChatViewer'));

const AdminRouter = (): any => {
    return (
        <MainLayout>
            <Routes>
                <Route exact path="character/:id" element={<CharacterDashboard />} />
                <Route exact path="unapproved" element={<UnapprovedCharacters />} />
                <Route exact path="npc/new" element={<CreateNewNpc />} />
                <Route exact path="npc/:id/define" element={<DefineNpc />} />
                <Route exact path="havens" element={<AdminHavens />} />
                <Route exact path="chat" element={<ChatViewer />} />
                <Route exact path="haven-events" element={<AdminHavenEvents />} />
            </Routes>
        </MainLayout>
    );
}

export default AdminRouter;
