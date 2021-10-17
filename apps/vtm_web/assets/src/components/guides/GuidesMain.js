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

type Props = {
    match: any
}

export const GuideRoutes = {
    home: "/guides",
    generalRules: "/guides/general-rules",
    environment: "/guides/environment",
    environmentBaires: "/guides/environment-baires",
    environmentSects: "/guides/environment-sects",
    npcs: "/guides/npcs"
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
                    <Route exact path={`${match.url}/environment`} component={GuidesEnvironment} />
                    <Route exact path={`${match.url}/environment-baires`} component={GuidesEnvironmentBaires} />
                    <Route exact path={`${match.url}/environment-sects`} component={GuidesEnvironmentSects} />
                    <Route exact path={`${match.url}/npcs`} component={GuidesNpcs} />
                </div>
            </Box>
        </GuideLayout>
    );
}

export default GuidesMain;
