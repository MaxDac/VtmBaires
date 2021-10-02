// @flow

import React from "react";
import MainLayout from "../MainLayout";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SetNewPassword from "./SetNewPassword";

type Props = {

}

const Settings = (props: Props): any => {
    return (
        <MainLayout>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <SetNewPassword />
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    );
}

export default Settings;
