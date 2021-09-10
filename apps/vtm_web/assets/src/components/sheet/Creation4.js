// @flow

import React from "react";

import type {DefaultComponentProps} from "../../_base/types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CreationBase from "./strategies/CreationBase";
import MainLayout from "../Main.Layout";

type FormAttributes = {
    discipline1: ?string;
    discipline2: ?string;
    predatorType: ?string;
};

const Creation3 = ({ setError }: DefaultComponentProps): any => {
    const emptyAttributes = {
        attribute4: "",
        attribute31: "",
        attribute32: "",
        attribute33: "",
        attribute21: "",
        attribute22: "",
        attribute23: "",
        attribute24: "",
        attribute1: ""
    };

    const getAttributesToSave = (values, generateRequest) => [
        generateRequest(values.attribute4, 4),
        generateRequest(values.attribute31, 3),
        generateRequest(values.attribute32, 3),
        generateRequest(values.attribute33, 3),
        generateRequest(values.attribute21, 2),
        generateRequest(values.attribute22, 2),
        generateRequest(values.attribute23, 2),
        generateRequest(values.attribute24, 2),
        generateRequest(values.attribute1, 1)
    ];

    const form = getAttributeSelector =>
        <>
            <Grid item xs={12}>
                <Typography>
                    Select the Disciplines of your character type:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {getAttributeSelector("attribute4", "Attribute at 4")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... three at 3 level:
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("attribute31", "Attribute at 3")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("attribute32", "Attribute at 3")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("attribute33", "Attribute at 3")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... four at 2 level:
                </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("attribute21", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("attribute22", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("attribute23", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("attribute24", "Attribute at 2")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... and finally, one attribute at 1:
                </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("attribute1", "Attribute at 1")}
            </Grid>
        </>;

    return (
        <MainLayout>
            { (classes: any) =>
                <div className={classes.centeredContainer}>
                    <CreationBase classes={classes}
                                  setError={setError}
                                  currentStage={2}
                                  attributeTypeName="Attribute"
                                  emptyAttributes={emptyAttributes}
                                  getAttributesToSave={getAttributesToSave}>
                        {form}
                    </CreationBase>
                </div>
            }
        </MainLayout>
    )
}

export default Creation3;