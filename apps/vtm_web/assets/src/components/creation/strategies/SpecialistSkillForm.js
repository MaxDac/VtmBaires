// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CreationBase from "./CreationBase";
import {propNotNullRendering} from "../../../_base/render-utils";
import { useSession } from "../../../services/session-service";
import type {GenericReactComponent} from "../../../_base/types";

export type CreationBaseProps = {
    classes: any;
}

const SpecialistSkillForm = ({ classes }: CreationBaseProps): GenericReactComponent => {
    const [, currentCharacter] = useSession();

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
                    Scegli una abilit&agrave; di livello 4:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {getAttributeSelector("skill4", "Abilità a 4")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... tre a livello 3:
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill31", "Abilità a 3")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill32", "Abilità a 3")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill33", "Abilità a 3")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... tre a livello 2:
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill21", "Abilità a 2")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill22", "Abilità a 2")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill23", "Abilità a 2")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... e infine tre di livello 1:
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill11", "Abilità a 1")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill12", "Abilità a 1")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("skill13", "Abilità a 1")}
            </Grid>
        </>;

    return propNotNullRendering(() => currentCharacter?.id, characterId => (
        <CreationBase classes={classes}
                      characterId={characterId}
                      currentStage={3}
                      attributeTypeName="Ability"
                      emptyAttributes={emptyAttributes}
                      getAttributesToSave={getAttributesToSave}>
            {form}
        </CreationBase>
    ));
}

export default SpecialistSkillForm;
