// @flow

import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CreationBase from "../strategies/CreationBase";

export type SpecialistFormAttributes = {
    skill4: string;
    skill31: string;
    skill32: string;
    skill33: string;
    skill21: string;
    skill22: string;
    skill23: string;
    skill11: string;
    skill12: string;
    skill13: string;
};

export type CreationBaseProps = {
    classes: any;
    setError: (string, string) => void;
}

const SpecialistSkillForm = ({ setError, classes }: CreationBaseProps): any => {
    const emptyAttributes = {
        skill4: "",
        skill31: "",
        skill32: "",
        skill33: "",
        skill21: "",
        skill22: "",
        skill23: "",
        skill11: "",
        skill12: "",
        skill13: ""
    };

    const getAttributesToSave = (values, generateRequest) => [
        generateRequest(values.skill4, 4),
        generateRequest(values.skill31, 3),
        generateRequest(values.skill32, 3),
        generateRequest(values.skill33, 3),
        generateRequest(values.skill21, 2),
        generateRequest(values.skill22, 2),
        generateRequest(values.skill23, 2),
        generateRequest(values.skill11, 1),
        generateRequest(values.skill12, 1),
        generateRequest(values.skill13, 1)
    ];

    const form = getAttributeSelector =>
        <>
            <Grid item xs={12}>
                <Typography>
                    You can choose one skill at 4 levels:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {getAttributeSelector("skill4", "Skill at 4")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... three at 3 level:
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill31", "Attribute at 3")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill32", "Attribute at 3")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill33", "Attribute at 3")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... three at 2 level:
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill21", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill22", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill23", "Attribute at 2")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... three at 1 level:
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill11", "Attribute at 1")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill12", "Attribute at 1")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill13", "Attribute at 1")}
            </Grid>
        </>;

    return (
        <CreationBase classes={classes}
                      setError={setError}
                      currentStage={3}
                      attributeTypeName="Ability"
                      emptyAttributes={emptyAttributes}
                      getAttributesToSave={getAttributesToSave}>
            { form }
        </CreationBase>
    )
}

export default SpecialistSkillForm;
