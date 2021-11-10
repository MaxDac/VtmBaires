// @flow

import React from "react";
import GuideLayout, {drawerWidth} from "./GuideLayout";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Route} from "react-router-dom";

type Props = {
    match: any
}

export const GuideRoutes = {
    home: "/guides",
    generalRules: "/guides/general-rules",
    introduction: "/guides/introduction",
    glossary: "/guides/glossary",
    environment: "/guides/environment",
    environmentBaires: "/guides/environment-baires",
    environmentSects: "/guides/environment-sects",
    npcs: "/guides/npcs",
    clans: "/guides/clans",
    attributes: "/guides/attributes",
    mechanics: "/guides/mechanics",
    creation: "/guides/creation",
    homeRules: "/guides/home-rules",
    places: "/guides/places",
    sayings: "/guides/sayings",
    siteHelp: "/guides/site-help",
    faqs: "/guides/faq",
    credits: "/guides/credits"
};

const GuidesHome = React.lazy(() => import("./guides-pages/GuidesHome"));
const GuidesIntroduction = React.lazy(() => import("./guides-pages/GuidesIntroduction"));
const GuidesEnvironment = React.lazy(() => import("./guides-pages/GuidesEnvironment"));
const GuidesGeneralRules = React.lazy(() => import("./guides-pages/GuidesGeneralRules"));
const GuidesEnvironmentBaires = React.lazy(() => import("./guides-pages/GuidesEnvironmentBaires"));
const GuidesEnvironmentSects = React.lazy(() => import("./guides-pages/GuidesEnvironmentSects"));
const GuidesNpcs = React.lazy(() => import("./guides-pages/GuidesNpcs"));
const GuidesFaq = React.lazy(() => import("./guides-pages/GuidesFaq"));
const GuidesPlaces = React.lazy(() => import("./guides-pages/GuidesPlaces"));
const GuidesCredits = React.lazy(() => import("./guides-pages/GuidesCredits"));
const GuidesSiteHelp = React.lazy(() => import("./guides-pages/GuidesSiteHelp"));
const GuidesGlossary = React.lazy(() => import("./guides-pages/GuidesGlossary"));
const GuidesHomeRules = React.lazy(() => import("./guides-pages/GuidesHomeRules"));
const GuidesSayings = React.lazy(() => import("./guides-pages/GuidesSayings"));
const GuidesClans = React.lazy(() => import("./guides-pages/GuidesClans"));
const GuidesAttributes = React.lazy(() => import("./guides-pages/GuidesAttributes"));
const GuidesMechanics = React.lazy(() => import("./guides-pages/GuidesMechanics"));
const GuidesCreation = React.lazy(() => import("./guides-pages/GuidesCreation"));

const GuidesMain = ({match}: Props): any => {
    return (
        <GuideLayout>
            <Box component="main" sx={{
                flexGrow: 1,
                p: 3,
                width: {
                    sm: `calc(100% - ${drawerWidth}px)`
                }
            }}>
                {/* Toolbar put here just to allow space at the top */}
                <Toolbar />
                <div>
                    <Route exact path={match.url} component={GuidesHome} />
                    <Route exact path={`${match.url}/general-rules`} component={GuidesGeneralRules} />
                    <Route exact path={`${match.url}/introduction`} component={GuidesIntroduction} />
                    <Route exact path={`${match.url}/glossary`} component={GuidesGlossary} />
                    <Route exact path={`${match.url}/environment`} component={GuidesEnvironment} />
                    <Route exact path={`${match.url}/environment-baires`} component={GuidesEnvironmentBaires} />
                    <Route exact path={`${match.url}/environment-sects`} component={GuidesEnvironmentSects} />
                    <Route exact path={`${match.url}/clans`} component={GuidesClans} />
                    <Route exact path={`${match.url}/attributes`} component={GuidesAttributes} />
                    <Route exact path={`${match.url}/mechanics`} component={GuidesMechanics} />
                    <Route exact path={`${match.url}/creation`} component={GuidesCreation} />
                    <Route exact path={`${match.url}/npcs`} component={GuidesNpcs} />
                    <Route exact path={`${match.url}/home-rules`} component={GuidesHomeRules} />
                    <Route exact path={`${match.url}/places`} component={GuidesPlaces} />
                    <Route exact path={`${match.url}/sayings`} component={GuidesSayings} />
                    <Route exact path={`${match.url}/site-help`} component={GuidesSiteHelp} />
                    <Route exact path={`${match.url}/faq`} component={GuidesFaq} />
                    <Route exact path={`${match.url}/credits`} component={GuidesCredits} />
                </div>
            </Box>
        </GuideLayout>
    );
}

export default GuidesMain;
