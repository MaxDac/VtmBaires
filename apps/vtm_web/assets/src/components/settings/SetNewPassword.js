// @flow

import React, {useContext} from "react";
import {object, string, ref} from 'yup';
import {useFormik} from "formik";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../contexts";
import FormTextField from "../../_base/components/FormTextField";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/styles";
import ChangeUserPasswordMutation from "../../services/mutations/sessions/ChangeUserPasswordMutation";

const SignUpSchema = object().shape({
    oldPassword: string("La tua vecchia passwod").required("Required"),
    newPassword: string("Enter your password")
        .min(8, "The password should be at least 8 characters long")
        .max(20, "The password should be no more than 20 characters long")
        .required("Required"),
    repeatPassword: string("Enter your password")
        .min(8, "The password should be at least 8 characters long")
        .max(20, "The password should be no more than 20 characters long")
        .oneOf([ref("newPassword"), null], "The two password don't match.")
        .required("Required")
});

const SetNewPassword = (): any => {
    const theme = useTheme();
    const environment = useRelayEnvironment();

    const { setError } = useContext(UtilityContext);

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            repeatPassword: ""
        },
        validationSchema: SignUpSchema,
        onSubmit: v => onSubmit(v)
    });

    const onSubmit = ({
                          oldPassword,
                          newPassword,
                          repeatPassword
                      }) => {
        ChangeUserPasswordMutation(environment,
            oldPassword,
            newPassword,
            repeatPassword)
            .then(response => {
                if (response === true) {
                    setError({type: "success", message: "La tua password è stata correttamente resettata."});
                }
                else {
                    setError({type: "warning", message: "Il cambio di password non è andato a buon fine, contatta un master per aiuto."});
                }
            })
            .catch(errors => {
                setError({ type: 'error', graphqlError: errors, message: "Username or password invalid." });
            });
    };

    return (
        <>
            <form style={{
                width: '100%', // Fix IE 11 issue.
                marginTop: "10px",
            }} noValidate onSubmit={formik.handleSubmit}>
                <FormTextField formik={formik} fieldName="oldPassword" label="Vecchia Password" type="password" />
                <FormTextField formik={formik} fieldName="newPassword" label="Nuova Password" type="password" />
                <FormTextField formik={formik} fieldName="repeatPassword" label="Ripeti Password" type="password" />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        margin: theme.spacing(3, 0, 2),
                    }}>
                    Register!
                </Button>
            </form>
        </>
    );
}

export default SetNewPassword;
