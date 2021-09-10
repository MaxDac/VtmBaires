// @flow

import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CreationBase from "../strategies/CreationBase";

export type JackOfAllTradesFormAttributes = {
    skill3: string;
    skill21: string;
    skill22: string;
    skill23: string;
    skill24: string;
    skill25: string;
    skill26: string;
    skill27: string;
    skill28: string;
    skill11: string;
    skill12: string;
    skill13: string;
    skill14: string;
    skill15: string;
    skill16: string;
    skill17: string;
    skill18: string;
    skill19: string;
    skill110: string;
};

export type CreationBaseProps = {
    classes: any;
    setError: (string, string) => void;
}

const JackOfAllTradesSkillForm = ({ setError, classes }: CreationBaseProps): any => {
    const emptyAttributes = {
        skill3: "",
        skill21: "",
        skill22: "",
        skill23: "",
        skill24: "",
        skill25: "",
        skill26: "",
        skill27: "",
        skill28: "",
        skill11: "",
        skill12: "",
        skill13: "",
        skill14: "",
        skill15: "",
        skill16: "",
        skill17: "",
        skill18: "",
        skill19: "",
        skill110: ""
    };

    const getAttributesToSave = (values, generateRequest) => [
        generateRequest(values.skill3, 3),
        generateRequest(values.skill21, 2),
        generateRequest(values.skill22, 2),
        generateRequest(values.skill23, 2),
        generateRequest(values.skill24, 2),
        generateRequest(values.skill25, 2),
        generateRequest(values.skill26, 2),
        generateRequest(values.skill27, 2),
        generateRequest(values.skill28, 2),
        generateRequest(values.skill11, 1),
        generateRequest(values.skill12, 1),
        generateRequest(values.skill13, 1),
        generateRequest(values.skill14, 1),
        generateRequest(values.skill15, 1),
        generateRequest(values.skill16, 1),
        generateRequest(values.skill17, 1),
        generateRequest(values.skill18, 1),
        generateRequest(values.skill19, 1),
        generateRequest(values.skill110, 1)
    ];

    const form = getAttributeSelector =>
        <>
            <Grid item xs={12}>
                <Typography>
                    You can choose one skill at 3 levels:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {getAttributeSelector("skill3", "Skill at 3")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... eight at 2 level:
                </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill21", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill22", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill23", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill24", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill25", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill26", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill27", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill28", "Attribute at 2")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... ten at 1 level:
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                {getAttributeSelector("skill11", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={2}>
                {getAttributeSelector("skill12", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={2}>
                {getAttributeSelector("skill13", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={2}>
                {getAttributeSelector("skill14", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={2}>
                {getAttributeSelector("skill15", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={2}>
                {getAttributeSelector("skill16", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill17", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill18", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill19", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill110", "Skill at 1")}
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

export default JackOfAllTradesSkillForm;
