// @flow

import React from "react";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { MainRoutes } from "../../MainRouter";
import type {GenericReactComponent} from "../../../_base/types";

type Props = {
    children: any;
}

const ReturnToMessagesControl = ({children}: Props): GenericReactComponent => {
    const navigate = useNavigate();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Button type="button" onClick={_ => navigate(MainRoutes.messages)}>Torna ai messaggi</Button>
            </Grid>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
}

export default ReturnToMessagesControl;
