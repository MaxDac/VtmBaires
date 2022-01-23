// @flow

import React from "react";
import {Routes, Route} from "react-router-dom";
import type {GenericReactComponent} from "../_base/types";
import MainLayout from "./MainLayout";

export const MainRoutes = {
    creation1: "/main/creation/1",
    creation2: "/main/creation/2",
    creation3: "/main/creation/3",
    creation4: "/main/creation/4",
    creation5: "/main/creation/5",
    creationBase: "/main/creation/",
    settings: "/main/settings",
    messages: "/main/messages",
    sentMessages: "/main/messages/sent",
    readMessage: (id: string): string => `/main/message/view/${id}`,
    newMessage: (id?: string): string => id ? `/main/message/new/${id}` : "/main/message/new",
    newMessageTo: (userId: string): string => `/main/message/new/user/${userId}`,
    newMessageToCharacter: (characterId: string): string => `/main/message/new/character/${characterId}`,
    forumSections: "/main/forum",
    forumSection: (sectionId: string): string => `/main/forum/${sectionId}`,
    forumThread: (threadId: string): string => `/main/forum/thread/${threadId}`,
    modifyForumThread: (sectionId: string, threadId: string): string => `/main/forum/${sectionId}/thread/${threadId}/modify`,
    createNewForumThread: (sectionId: string): string => `/main/forum/${sectionId}/thread/new`,
    createNewForumPost: (threadId: string): string => `/main/forum/thread/${threadId}/post/new`,
    modifyForumPost: (threadId: string, postId: string): string => `/main/forum/thread/${threadId}/post/modify/${postId}`,
    mainMap: "/main/map",
    hunt: "/main/hunt",
    havenEvents: "/main/haven-events",

    charactersList: "/main/characters",
    sheet: (id?: ?string, reload?: ?boolean): string =>
        id != null
            ? (reload === true ? `/main/sheet/${id}/reload` : `/main/sheet/${id}`)
            : "/main/character",
    modifySheet: (id: string): string => `/main/sheet/modify/${id}`,
    subMap: (id: string): string => `/main/map/${id}`,
    chat: (id: string): string => `/main/chat/${id}`,
    bookChat: "/main/book-chat"
}

const Main = React.lazy(() => import('./Main'));
const Creation1 = React.lazy(() => import('./creation/Creation1'));
const Creation2 = React.lazy(() => import('./creation/Creation2'));
const Creation3 = React.lazy(() => import('./creation/Creation3'));
const Creation4 = React.lazy(() => import('./creation/Creation4'));
const Creation5 = React.lazy(() => import('./creation/Creation5'));

const CharacterSheet = React.lazy(() => import('./character/CharacterSheet'));
const ModifyCharacterSheet: any = React.lazy(() => import('./character/ModifyCharacterSheet'));

const MainMap = React.lazy(() => import('./map/MainMap'));
const Map: any = React.lazy(() => import('./map/Map'));
const Chat = React.lazy(() => import('./chat/Chat'));
const BookChats = React.lazy(() => import('./chat/BookChats'));
const Hunt = React.lazy(() => import('./hunt/Hunt'));
const HavenEvents = React.lazy(() => import('./haven/HavenEvents'));

const Settings = React.lazy(() => import('./settings/Settings'));
const ReceivedMessages = React.lazy(() => import('./messages/ReceivedMessages'));
const SentMessages = React.lazy(() => import('./messages/SentMessages'));
const NewMessage: any = React.lazy(() => import('./messages/NewMessage'));
const ReadMessage: any = React.lazy(() => import('./messages/ReadMessage'));

const ForumSections = React.lazy(() => import('./forum/ForumSections'));
const CreateNewThread = React.lazy(() => import('./forum/CreateNewThread'));
const ModifyThread = React.lazy(() => import('./forum/ModifyThread'));
const ManagePost = React.lazy(() => import('./forum/ManagePost'));
const ForumThread = React.lazy(() => import('./forum/ForumThread'));
const ForumSection = React.lazy(() => import('./forum/ForumSection'));
const CharactersList = React.lazy(() => import('./character/CharactersList'));

const MainRouter = (): GenericReactComponent => {
    return (
        <MainLayout>
            <Routes>
                <Route index element={<Main />} />
                <Route path="creation/1" element={<Creation1 />} />
                <Route path="creation/2" element={<Creation2 />} />
                <Route path="creation/3" element={<Creation3 />} />
                <Route path="creation/4" element={<Creation4 />} />
                <Route path="creation/5" element={<Creation5 />} />
                <Route path="characters" element={<CharactersList />} />
                <Route path="sheet/modify/:id" element={<ModifyCharacterSheet />} />
                <Route path="sheet" element={<CharacterSheet />} />
                <Route path="sheet/:id/reload" element={<CharacterSheet />} />
                <Route path="sheet/:id" element={<CharacterSheet />} />
                <Route path="map" element={<MainMap />} />
                <Route path="map/:id" element={<Map />} />
                <Route path="chat/:id" element={<Chat />} />
                <Route path="book-chat" element={<BookChats />} />
                <Route path="hunt" element={<Hunt />} />
                <Route path="haven-events" element={<HavenEvents />} />
                <Route path="settings" element={<Settings />} />
                <Route path="messages/sent" element={<SentMessages />} />
                <Route path="messages" element={<ReceivedMessages />} />
                <Route path="message/view/:id" element={<ReadMessage />} />
                <Route path="message/new/user/:id" element={<NewMessage />} />
                <Route path="message/new/character/:id" element={<NewMessage />} />
                <Route path="message/new/:id" element={<NewMessage />} />
                <Route path="message/new" element={<NewMessage />} />
                <Route path="forum" element={<ForumSections />} />
                <Route path="forum/thread/:id" element={<ForumThread />} />
                <Route path="forum/:id" element={<ForumSection />} />
                <Route path="forum/:id/thread/:threadId/modify" element={<ModifyThread />} />
                <Route path="forum/:id/thread/new" element={<CreateNewThread />} />
                <Route path="forum/thread/:threadId/post/modify/:postId" element={<ManagePost />} />
                <Route path="forum/thread/:id/post/new" element={<ManagePost />} />
            </Routes>
        </MainLayout>
    );
}

export default MainRouter;
