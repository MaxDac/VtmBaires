// @flow

import React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';

import { login, storeLoginInformation } from "../../services/login-service";
import HomeLayout from "./Home.Layout";

import type { Node } from "react";
import { Link, useHistory } from "react-router-dom";

import { object, string } from 'yup';
import { useFormik } from "formik";
import FormTextField from "../../_base/components/FormTextField";
import {Routes} from "../../AppRouter";

type LoginComponentProps = {
    setError: (string, string) => void;
}

const SignInSchema = object().shape({
    email: string("Enter your email")
        .email("Invalid name")
        .required("Required"),
    password: string("Enter your password").required("Required")
});

const LoginComponent = ({
    setError
}: LoginComponentProps): Node => {
    const history = useHistory();
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: SignInSchema,
        onSubmit: v => onSubmit(v)
    })

    const onSubmit = ({
        email,
        password
    }) =>
        login(email, password, "MASTER")
            .then(res => {
                storeLoginInformation(res.data.user);
                history.push(Routes.get("main"));
            })
            .catch(errors => {
                setError(errors, "Username or password invalid.");
            });

    return (
        <HomeLayout title="Sign in">
            { classes => 
                <>
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        <FormTextField formik={formik} fieldName="email" label="Email" />
                        <FormTextField formik={formik} fieldName="password" label="Password" type="password" />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Sign In
                        </Button>
                    </form>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </>
            }
        </HomeLayout>);
};

export default LoginComponent;
