// @flow

import React from "react";
import {number, object, string} from "yup";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import type {Haven} from "../../../services/queries/haven/GetHavensQuery";
import {rangeArray} from "../../../_base/utils";
import FormSelectField from "../../../_base/components/FormSelectField";
import type {GenericReactComponent} from "../../../_base/types";

const AdminHavensResonanceFormSchema = object().shape({
    resonance: string("La risonanza").required("La risonanza è richiesta"),
    power: number().required(),
});

type ResonancesFormSubmitProps = {
    resonance: string;
    power: number;
};

type AdminHavensResonanceFormInternalProps = {
    resonances: Array<[string, string]>;
    haven: Haven;
    onSubmit: ResonancesFormSubmitProps => void;
};

const AdminHavensResonanceForm: GenericReactComponent =
    React.forwardRef(({resonances, haven, onSubmit}: AdminHavensResonanceFormInternalProps, ref): GenericReactComponent => {
        const generateValues = rangeArray(1, 5).map(x => [String(x), String(x)]);

        const formik = useFormik({
            initialValues: {
                resonance: "",
                power: 1
            },
            validationSchema: AdminHavensResonanceFormSchema,
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
                                         fieldName="power"
                                         label="Potere della Traccia"
                                         values={generateValues} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormSelectField formik={formik}
                                         fieldName="resonance"
                                         label="Risonanza"
                                         addNullValue
                                         values={resonances} />
                    </Grid>
                    <Button ref={ref}
                            type="submit"
                            sx={{display: "none"}} />
                </Grid>
            </form>
        );
    });

export default AdminHavensResonanceForm;
