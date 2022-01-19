// @flow

import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SetNewPassword from "./SetNewPassword";
import type {GenericReactComponent} from "../../_base/types";

type Props = {

}

const Settings = (props: Props): GenericReactComponent => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <SetNewPassword />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Settings;
