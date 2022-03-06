// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import type {GenericReactComponent} from "../types";

const AppVersion = (): GenericReactComponent => {
    return (
        <Typography sx={{
            fontSize: "13px"
        }}>
            App Version: 1.3.0.22030602
        </Typography>
    );
};

export default AppVersion;
