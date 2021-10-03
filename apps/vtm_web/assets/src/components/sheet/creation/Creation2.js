// @flow

import React from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CreationBase from "../strategies/CreationBase";
import MainLayout from "../../MainLayout";
import useStyles from "../../Main.Layout.Style";
import {useSession} from "../../../services/session-service";

// type FormAttributes = {
//     attribute4: string;
//     attribute31: string;
//     attribute32: string;
//     attribute33: string;
//     attribute21: string;
//     attribute22: string;
//     attribute23: string;
//     attribute24: string;
//     attribute1: string;
// };

const Creation2 = (): any => {
    const classes = useStyles();
    const [, character] = useSession();

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
                    You can choose one attribute at 4 levels:
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

    const getForm = () => {
        if (character?.id != null) {
            return (
                <div className={classes.centeredContainer}>
                    <CreationBase classes={classes}
                                  characterId={character.id}
                                  currentStage={2}
                                  attributeTypeName="Attribute"
                                  emptyAttributes={emptyAttributes}
                                  getAttributesToSave={getAttributesToSave}>
                        {form}
                    </CreationBase>
                </div>
            );
        }
        
        return <></>;
    }

    return (
        <MainLayout>
            {getForm()}
        </MainLayout>
    );
}

export default Creation2;