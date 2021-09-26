// @flow

import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import type {Formik} from "./FormTypes";

type Props = {
    formik: Formik,
    fieldName: string,
    label: string,
    onChanged?: boolean => void
}

const FormCheckboxField = ({formik, fieldName, label, onChanged}: Props): any => {
    const onControlChanged = e => {
        formik.handleChange(e);

        if (onChanged != null) {
            onChanged(e.target.checked);
        }
    }

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox onChange={onControlChanged}
                              checked={formik.values["remember"]}
                              name={fieldName}
                              id={fieldName}
                              color="primary" />
                }
                label={label} />
        </FormGroup>
    );
}

export default FormCheckboxField;
