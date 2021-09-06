// @flow

import React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import createUser from "../../services/queries/create-user-mutation";
import HomeLayout from "./Home.Layout";

import { object, string, ref } from 'yup';
import { useFormik } from "formik";
import FormTextField from "../../_base/components/FormTextField";

import { Link } from "react-router-dom";

import type { CreationResult } from "../../services/queries/create-user-mutation";
import type { Node } from "react";

type CreateUserComponentProps = {
    setError: (string, string) => void;
}

const SignUpSchema = object().shape({
    email: string("Enter your email")
        .email("Invalid name")
        .required("Required"),
    name: string("Enter your name").required("Required"),
    password: string("Enter your password")
        .min(8, "The password should be at least 8 characters long")
        .max(20, "The password should be no more than 20 characters long")
        .required("Required"),
    passwrepeatpasswordord: string("Enter your password")
        .min(8, "The password should be at least 8 characters long")
        .max(20, "The password should be no more than 20 characters long")
        .oneOf([ref("passwod"), null], "The two password don't match.")
        .required("Required")
});

const CreateUserComponent = ({
    setError
}: CreateUserComponentProps): Node => {
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            password: "",
            repeatpassword: ""
        },
        validationSchema: SignUpSchema,
        onSubmit: v => onSubmit(v)
    });

    const onSubmit = ({
        email,
        name,
        password,
        _repeatpassword
    }) => 
        createUser(email, password, name)
            .then((res: CreationResult) => {
                // setToken(res.login?.token ?? "");
            })
            .catch(errors => {
                setError(errors, "Username or password invalid.");
            });

    return (
        <HomeLayout title="Register">
            { classes => 
                <>
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        <FormTextField formik={formik} fieldName="email" label="Email" />
                        <FormTextField formik={formik} fieldName="name" label="Name" />
                        <FormTextField formik={formik} fieldName="password" label="Password" type="password" />
                        <FormTextField formik={formik} fieldName="repeatpassword" label="Repeat Password" type="password" />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Register!
                        </Button>
                    </form>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/" variant="body2">
                                Return to Login
                            </Link>
                        </Grid>
                    </Grid>
                </>
            }
        </HomeLayout>);
};

export default CreateUserComponent;
