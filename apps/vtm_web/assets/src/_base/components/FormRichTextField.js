// @flow

import React from "react";
import SunEditor from "suneditor-react";
import type {Formik} from "./FormTypes";

export type FormRichTextFieldProps = {
    formik: Formik;
    fieldName: string;
    label?: ?string;
}

const FormRichTextField = ({formik, fieldName, label}: FormRichTextFieldProps): any => {
    const onComponentChange = e => {
        formik.handleChange(e);
    }
    
    return (
        <SunEditor onChange={onComponentChange}
                   id={fieldName}
                   name={fieldName}
                   setOptions={{
                       colorList: [ ['#ff0000', '#ff5e00', '#ffe400', '#abf200'], ['#00d8ff', '#0055ff', '#6600ff', '#ff00dd'] ]
                   }}/>
    );
};

export default FormRichTextField;
