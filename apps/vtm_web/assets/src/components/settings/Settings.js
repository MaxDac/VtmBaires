// @flow

import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SetNewPassword from "./components/SetNewPassword";
import type {GenericReactComponent} from "../../_base/types";
import RequireAuth from "../_auth/RequireAuth";
import RouterPage from "../RouterPage";

const Settings = (): GenericReactComponent => {
    return (
        <RequireAuth>
            <RouterPage>
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <SetNewPassword />
                        </Grid>
                    </Grid>
                </Container>
            </RouterPage>
        </RequireAuth>
    );
};

export default Settings;
