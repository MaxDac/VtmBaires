// @flow

import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AttributeSelectionField from "../AttributeSelectionField";

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

const JackOfAllTradesAbilitiesForm = () => {
    const [values, setValues] = useState<JackOfAllTradesFormAttributes>({
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
    });

    const getAttributeSelector = (fieldName: string, label: string): any =>
        <AttributeSelectionField fieldName={fieldName}
                                 label={label}
                                 value={values[fieldName]}
                                 values={selectFields}
                                 onChange={checkAttributes} />;

    return (
        <>
            <Grid item xs={12}>
                <Typography>
                    You can choose one attribute at 3 levels:
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
        </>);
}