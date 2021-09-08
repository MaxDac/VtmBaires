// @flow

import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import type { Formik } from "./FormTypes";
import {makeStyles} from "@material-ui/core/styles";

export type SelectInputProps = {
    formik: Formik;
    fieldName: string;
    label: string;
    values: [string, string][];
};

export const useStyles: any = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

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
