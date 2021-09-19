// @flow

import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import type { Formik } from "./FormTypes";
import useStyles from "../../components/Main.Layout.Style";

export type SelectInputProps = {
    formik: Formik;
    fieldName: string;
    label: string;
    values: Array<[string, string]>;
};

const FormSelectField = (props: SelectInputProps): any => {
    const classes = useStyles();

    const items = () => {
        const values = props.values;
        if (values && values.map) {
            return values
                .map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>);
        }

        return [];
    }

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-label">{props.label}</InputLabel>
            <Select
                labelId="select-label"
                id={props.fieldName}
                name={props.fieldName}
                fullWidth
                value={props.formik.values[props.fieldName]}
                onChange={props.formik.handleChange}
                error={props.formik.touched[props.fieldName] && Boolean(props.formik.errors[props.fieldName])}>
                {items()}
            </Select>
        </FormControl>
    );
}

export default FormSelectField;
