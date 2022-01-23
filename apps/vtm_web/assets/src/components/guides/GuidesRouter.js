// @flow

import React from "react";
import {Routes, Route} from "react-router-dom";
import type {GenericReactComponent} from "../../_base/types";

export const GuideRoutes = {
    home: "/guides",
    generalRules: "/guides/general-rules",
    roles: "/guides/roles",
    introduction: "/guides/introduction",
    glossary: "/guides/glossary",
    environment: "/guides/environment",
    environmentBaires: "/guides/environment-baires",
    camarilla: "/guides/camarilla",
    environmentSects: "/guides/environment-sects",
    npcs: "/guides/npcs",
    currentSituation: "/guides/current-situation",
    clans: "/guides/clans",
    attributes: "/guides/attributes",
    mechanics: "/guides/mechanics",
    creation: "/guides/creation",
    homeRules: "/guides/home-rules",
    hunt: "/guides/hunt",
    experience: "/guides/experience",
    places: "/guides/places",
    sayings: "/guides/sayings",
    siteHelp: "/guides/site-help",
    faqs: "/guides/faq",
    credits: "/guides/credits"
};

const GuidesHome = React.lazy(() => import("./guides-pages/GuidesHome"));
const GuidesIntroduction = React.lazy(() => import("./guides-pages/GuidesIntroduction"));
const GuidesRoles = React.lazy(() => import("./guides-pages/GuidesRoles"));
const GuidesEnvironment = React.lazy(() => import("./guides-pages/GuidesEnvironment"));
const GuidesGeneralRules = React.lazy(() => import("./guides-pages/GuidesGeneralRules"));
const GuidesEnvironmentBaires = React.lazy(() => import("./guides-pages/GuidesEnvironmentBaires"));
const GuidesCamarilla = React.lazy(() => import("./guides-pages/GuidesCamarilla"));
const GuidesEnvironmentSects = React.lazy(() => import("./guides-pages/GuidesEnvironmentSects"));
const GuidesNpcs = React.lazy(() => import("./guides-pages/GuidesNpcs"));
const GuidesCurrentSituation = React.lazy(() => import("./guides-pages/GuidesCurrentSituation"));
const GuidesFaq = React.lazy(() => import("./guides-pages/GuidesFaq"));
const GuidesPlaces = React.lazy(() => import("./guides-pages/GuidesPlaces"));
const GuidesCredits = React.lazy(() => import("./guides-pages/GuidesCredits"));
const GuidesSiteHelp = React.lazy(() => import("./guides-pages/GuidesSiteHelp"));
const GuidesGlossary = React.lazy(() => import("./guides-pages/GuidesGlossary"));
const GuidesHomeRules = React.lazy(() => import("./guides-pages/GuidesHomeRules"));
const GuidesHunt = React.lazy(() => import("./guides-pages/GuidesHunt"));
const GuidesExperience = React.lazy(() => import("./guides-pages/GuidesExperience"));
const GuidesSayings = React.lazy(() => import("./guides-pages/GuidesSayings"));
const GuidesClans = React.lazy(() => import("./guides-pages/GuidesClans"));
const GuidesAttributes = React.lazy(() => import("./guides-pages/GuidesAttributes"));
const GuidesMechanics = React.lazy(() => import("./guides-pages/GuidesMechanics"));
const GuidesCreation = React.lazy(() => import("./guides-pages/GuidesCreation"));

const GuidesRouter = (): GenericReactComponent => {
    return (
        <Routes>
            <Route index element={<GuidesHome />} />
            <Route path="general-rules" element={<GuidesGeneralRules />} />
            <Route path="roles" element={<GuidesRoles />} />
            <Route path="introduction" element={<GuidesIntroduction />} />
            <Route path="glossary" element={<GuidesGlossary />} />
            <Route path="environment" element={<GuidesEnvironment />} />
            <Route path="environment-baires" element={<GuidesEnvironmentBaires />} />
            <Route path="camarilla" element={<GuidesCamarilla />} />
            <Route path="environment-sects" element={<GuidesEnvironmentSects />} />
            <Route path="current-situation" element={<GuidesCurrentSituation />} />
            <Route path="clans" element={<GuidesClans />} />
            <Route path="attributes" element={<GuidesAttributes />} />
            <Route path="mechanics" element={<GuidesMechanics />} />
            <Route path="creation" element={<GuidesCreation />} />
            <Route path="npcs" element={<GuidesNpcs />} />
            <Route path="home-rules" element={<GuidesHomeRules />} />
            <Route path="hunt" element={<GuidesHunt />} />
            <Route path="experience" element={<GuidesExperience />} />
            <Route path="places" element={<GuidesPlaces />} />
            <Route path="sayings" element={<GuidesSayings />} />
            <Route path="site-help" element={<GuidesSiteHelp />} />
            <Route path="faq" element={<GuidesFaq />} />
            <Route path="credits" element={<GuidesCredits />} />
        </Routes>
    );
}

export default GuidesRouter;
