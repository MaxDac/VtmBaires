// @flow

import React from 'react';
import TextField from "@mui/material/TextField";
import type { Formik } from "./FormTypes";
import type {GenericReactComponent} from "../types";

type FormTextFieldProps = {
    formik: Formik;
    fieldName: string;
    type?: ?string;
    autoComplete?: ?string;
    label?: ?string;
    multiline?: ?boolean;
    rows?: ?number;
    minRows?: ?number;
    maxRows?: ?number;
    fullWidth?: ?boolean;
    className?: ?string;
    validate?: ?(string => string);
}

const FormTextField = (props: FormTextFieldProps): GenericReactComponent => {
    const multiline = props.multiline != null
        ? props.multiline
        : props.rows && props.rows > 1
            ? true
            : props.multiline;

    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth={props.fullWidth ?? true}
            className={props.className ?? ""}
            label={props.label ?? ""}
            type={props.type ?? "text"}
            id={props.fieldName}
            name={props.fieldName}
            autoComplete={props.autoComplete ?? ""}
            multiline={multiline}
            rows={props.rows}
            minRows={props.minRows}
            maxRows={props.maxRows}
            value={props.formik.values[props.fieldName]}
            onChange={props.formik.handleChange}
            error={props.formik.touched[props.fieldName] && Boolean(props.formik.errors[props.fieldName])}
            helperText={props.formik.touched[props.fieldName] && props.formik.errors[props.fieldName]}
            validate={props.validate}/>
    );
};

export default FormTextField;
