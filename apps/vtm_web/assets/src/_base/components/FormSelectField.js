// @flow

import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import type { Formik } from "./FormTypes";
import {useTheme} from "@mui/material/styles";
import type {GenericReactComponent} from "../types";

export type SelectInputProps = {
    formik: Formik;
    fieldName: string;
    label: string;
    values: Array<[string, string]>;
    addNullValue?: boolean,
    sx?: any;
};

const emptyMenuItem = () => (
    <MenuItem key="element-zero" value={null}>None</MenuItem>
);

const FormSelectField = (props: SelectInputProps): GenericReactComponent => {
    const theme = useTheme();

    const items = () => {
        const values = props.values;
        if (values && values.map) {
            const items = values
                .map(([value, label]) => <MenuItem key={value ?? "is-null"} value={value}>{label}</MenuItem>);

            if (props.addNullValue === true) {
                return [emptyMenuItem()].concat(items);
            }

            return items;
        }

        return [];
    };

    return (
        <FormControl sx={{
            margin: theme.spacing(1),
            minWidth: 150,
        }}>
            <InputLabel id={`select-for-${props.fieldName}`}>{props.label}</InputLabel>
            <Select labelId={`select-for-${props.fieldName}`}
                    id={props.fieldName}
                    name={props.fieldName}
                    fullWidth
                    sx={{
                        ...props.sx,
                        minWidth: theme.spacing(10)
                    }}
                    label={props.label}
                    value={props.formik.values[props.fieldName]}
                    onChange={props.formik.handleChange}
                    error={props.formik.touched[props.fieldName] && Boolean(props.formik.errors[props.fieldName])}>
                {items()}
            </Select>
        </FormControl>
    );
}

export default FormSelectField;
