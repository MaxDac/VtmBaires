// @flow

import React from "react";
import MainLayout from "../../MainLayout";
import {mainFontFamily} from "../../Main.Layout.Style";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type Props = {
    title: string;
    description?: ?string;
    goBack: void => void;
    children: any;
}

const ForumFormLayout = ({title, description, children}: Props): any => {
    const showDescription = () => {
        if (description != null && description !== "") {
            return (
                <Grid item xs={12}>
                    <Typography component="span">
                        {description}
                    </Typography>
                </Grid>
            );
        }

        return <></>;
    }

    return (
        <MainLayout>
            <Grid container>
                <Grid item xs={12}>
                    <Typography component="h1" style={{
                        ...mainFontFamily,
                        fontSize: "24px",
                        padding: "10px",
                        paddingBottom: "20px"
                    }}>
                        {title}
                    </Typography>
                </Grid>
                {showDescription()}
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </MainLayout>
    );
}

export default ForumFormLayout;
