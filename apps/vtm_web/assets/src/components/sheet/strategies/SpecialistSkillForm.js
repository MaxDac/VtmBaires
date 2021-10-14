// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CreationBase from "../strategies/CreationBase";
import {propNotNullRendering} from "../../../_base/render-utils";
import { useSession } from "../../../services/session-service";

export type CreationBaseProps = {
    classes: any;
}

const SpecialistSkillForm = ({ classes }: CreationBaseProps): any => {
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
                {getAttributeSelector("skill4", "Skill at 4")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... tre a livello 3:
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
                    ... tre a livello 2:
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
                    ... e infine tre di livello 1:
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

export default SpecialistSkillForm;
