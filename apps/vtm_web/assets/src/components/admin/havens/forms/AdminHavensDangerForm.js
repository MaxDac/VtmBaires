// @flow

import React from "react";
import {number, object} from "yup";
import type {Haven} from "../../../../services/queries/haven/GetHavensQuery";
import type {GenericReactComponent} from "../../../../_base/types";
import {rangeArray} from "../../../../_base/utils";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import FormSelectField from "../../../../_base/components/FormSelectField";
import Button from "@mui/material/Button";

const AdminHavensDangerFormSchema = object().shape({
    danger: number().required(),
    range: number().required()
});

export type DangerFormSubmitProps = {
    danger: number;
    range: number;
};

type AdminHavensDangerFormInternalProps = {
    haven: Haven;
    onSubmit: DangerFormSubmitProps => void;
};

const AdminHavensDangerForm: GenericReactComponent =
    React.forwardRef(({haven, onSubmit}: AdminHavensDangerFormInternalProps, ref): GenericReactComponent => {
        const generateValues = rangeArray(0, 10).map(x => [String(x), String(x)]);
        const generateRangeValues = rangeArray(1, 5).map(x => [String(x), String(x)]);

        const formik = useFormik({
            initialValues: {
                danger: 1,
                range: 1
            },
            validationSchema: AdminHavensDangerFormSchema,
            onSubmit
        });

        return (
            <form noValidate onSubmit={formik.handleSubmit}>
                <Grid container sx={{
                    paddingTop: "1rem",
                    width: "100%",
                    textAlign: "center"
                }}>
                    <Grid item xs={12} md={6}>
                        <FormSelectField formik={formik}
                                         fieldName="danger"
                                         label="Livello di Pericolo"
                                         values={generateValues} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormSelectField formik={formik}
                                         fieldName="range"
                                         label="Area interessata"
                                         values={generateRangeValues} />
                    </Grid>
                    <Button ref={ref}
                            type="submit"
                            sx={{display: "none"}} />
                </Grid>
            </form>
        );
    });

export default AdminHavensDangerForm;
