// @flow

import React from "react";
import GuideLayout, {drawerWidth} from "./GuideLayout";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Route} from "react-router-dom";
import GuidesHome from "./guides-pages/GuidesHome";
import GuidesEnvironment from "./guides-pages/GuidesEnvironment";
import GuidesGeneralRules from "./guides-pages/GuidesGeneralRules";
import GuidesEnvironmentBaires from "./guides-pages/GuidesEnvironmentBaires";
import GuidesEnvironmentSects from "./guides-pages/GuidesEnvironmentSects";
import GuidesNpcs from "./guides-pages/GuidesNpcs";
import GuidesFaq from "./guides-pages/GuidesFaq";
import GuidesPlaces from "./guides-pages/GuidesPlaces";
import GuidesCredits from "./guides-pages/GuidesCredits";
import GuidesSiteHelp from "./guides-pages/GuidesSiteHelp";
import GuidesGlossary from "./guides-pages/GuidesGlossary";
import GuidesRules from "./guides-pages/GuidesRules";
import GuidesSayings from "./guides-pages/GuidesSayings";

type Props = {
    match: any
}

export const GuideRoutes = {
    home: "/guides",
    generalRules: "/guides/general-rules",
    glossary: "/guides/glossary",
    environment: "/guides/environment",
    environmentBaires: "/guides/environment-baires",
    environmentSects: "/guides/environment-sects",
    npcs: "/guides/npcs",
    rules: "/guides/rules",
    places: "/guides/places",
    sayings: "/guides/sayings",
    siteHelp: "/guides/site-help",
    faqs: "/guides/faq",
    credits: "/guides/credits"
};

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
                    <Route exact path={`${match.url}/glossary`} component={GuidesGlossary} />
                    <Route exact path={`${match.url}/environment`} component={GuidesEnvironment} />
                    <Route exact path={`${match.url}/environment-baires`} component={GuidesEnvironmentBaires} />
                    <Route exact path={`${match.url}/environment-sects`} component={GuidesEnvironmentSects} />
                    <Route exact path={`${match.url}/npcs`} component={GuidesNpcs} />
                    <Route exact path={`${match.url}/rules`} component={GuidesRules} />
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
