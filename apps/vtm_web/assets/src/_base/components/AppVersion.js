// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import type {GenericReactComponent} from "../types";

const AppVersion = (): GenericReactComponent => {
    return (
        <Typography sx={{
            fontSize: "13px"
        }}>
            App Version: 1.2.4.22020801
        </Typography>
    );
};

export default AppVersion;
