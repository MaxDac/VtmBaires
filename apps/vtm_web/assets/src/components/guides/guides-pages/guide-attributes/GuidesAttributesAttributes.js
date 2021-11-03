// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {guideStyle, titleStyle} from "../../GuidesStyles";

type Props = {
    showAttributes: (string, string) => any[];
}

const GuidesAttributesAttributes = ({showAttributes}: Props): any => {
    const showAttributeColumns = (name: string, title: string) => (
        <>
            <Grid item xs={12}>
                <Typography paragraph>
                    <h3 style={titleStyle}>
                        {title}
                    </h3>
                </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Typography paragraph sx={{ textAlign: "center" }}>
                    <h4 style={titleStyle}>
                        Fisici
                    </h4>
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    <ul>
                        {showAttributes(name, "Physical")}
                    </ul>
                </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Typography paragraph sx={{ textAlign: "center" }}>
                    <h4 style={titleStyle}>
                        Sociali
                    </h4>
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    <ul>
                        {showAttributes(name, "Social")}
                    </ul>
                </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Typography paragraph sx={{ textAlign: "center" }}>
                    <h4 style={titleStyle}>
                        Mentali
                    </h4>
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    <ul>
                        {showAttributes(name, "Mental")}
                    </ul>
                </Typography>
            </Grid>
        </>
    );

    return (
        <>
            <Grid container>
                {showAttributeColumns("Attribute", "Attributi")}
                {showAttributeColumns("Ability", "Abilità")}
            </Grid>
        </>
    );
};

export default GuidesAttributesAttributes;
