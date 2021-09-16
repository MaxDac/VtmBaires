// @flow

import React from "react";
import MainLayout from "./Main.Layout";
import Typography from "@material-ui/core/Typography";

type Props = {
    error: any,
    retry: ?(() => void),
}

const FallbackComponent = ({error}: Props): any => {
    return (
        <MainLayout>
            { classes =>
                <Typography>
                    There was an error in the app: {JSON.stringify(error)}
                </Typography>
            }
        </MainLayout>
    )
}

export default FallbackComponent;
