// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CreationBase from "./CreationBase";
import {propNotNullRendering} from "../../../_base/render-utils";
import { useSession } from "../../../services/session-service";

export type CreationBaseProps = {
    classes: any;
}

const BalancedSkillForm = ({ classes }: CreationBaseProps): any => {
    const [, currentCharacter] = useSession();

    const emptyAttributes = {
        skill31: "",
        skill32: "",
        skill33: "",
        skill21: "",
        skill22: "",
        skill23: "",
        skill24: "",
        skill25: "",
        skill11: "",
        skill12: "",
        skill13: "",
        skill14: "",
        skill15: "",
        skill16: "",
        skill17: ""
    };

    const getAttributesToSave = (values, generateRequest) => [
        generateRequest(values.skill31, 3),
        generateRequest(values.skill32, 3),
        generateRequest(values.skill33, 3),
        generateRequest(values.skill21, 2),
        generateRequest(values.skill22, 2),
        generateRequest(values.skill23, 2),
        generateRequest(values.skill24, 2),
        generateRequest(values.skill25, 2),
        generateRequest(values.skill11, 1),
        generateRequest(values.skill12, 1),
        generateRequest(values.skill13, 1),
        generateRequest(values.skill14, 1),
        generateRequest(values.skill15, 1),
        generateRequest(values.skill16, 1),
        generateRequest(values.skill17, 1)
    ];

    const form = getAttributeSelector =>
        <>
            <Grid item xs={12}>
                <Typography>
                    Puoi scegliere tre abilit&agrave; di livello 3:
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                {getAttributeSelector("skill31", "Skill at 3")}
            </Grid>
            <Grid item xs={12} sm={4}>
                {getAttributeSelector("skill32", "Skill at 3")}
            </Grid>
            <Grid item xs={12} sm={4}>
                {getAttributeSelector("skill33", "Skill at 3")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... cinque di livello 2:
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
            <Grid item xs={12} md={6}>
                {getAttributeSelector("skill24", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={6}>
                {getAttributeSelector("skill25", "Attribute at 2")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... e sette di livello 1:
                </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill11", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill12", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill13", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("skill14", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill15", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill16", "Skill at 1")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill17", "Skill at 1")}
            </Grid>
        </>;

    return propNotNullRendering(() => currentCharacter?.id, characterId => (
        <CreationBase classes={classes}
                      characterId={characterId}
                      currentStage={3}
                      attributeTypeName="Ability"
                      emptyAttributes={emptyAttributes}
                      getAttributesToSave={getAttributesToSave}>
            { form }
        </CreationBase>
    ));
}

export default BalancedSkillForm;