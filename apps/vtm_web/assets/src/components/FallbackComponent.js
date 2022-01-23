// @flow

import React from "react";
import RouterPage from "./RouterPage";
import Typography from "@mui/material/Typography";
import type {GenericReactComponent} from "../_base/types";

type Props = {
    error: any,
    retry: ?(() => void),
}

const FallbackComponent = ({error}: Props): GenericReactComponent => {
    return (
        <RouterPage>
            <Typography>
                There was an error in the app: {JSON.stringify(error)}
            </Typography>
        </RouterPage>
    )
}

export default FallbackComponent;
