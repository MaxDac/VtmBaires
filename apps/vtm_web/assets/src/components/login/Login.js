// @flow

import React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import { login } from "../../services/login-service";
import LoginLayout from "./LoginLayout";
import type { Node } from "react";
import { Link, useHistory } from "react-router-dom";
import {bool, object, string} from 'yup';
import { useFormik } from "formik";
import FormTextField from "../../_base/components/FormTextField";
import {Routes} from "../../AppRouter";
import {storeLoginInformation} from "../../services/session-service";
import type {DefaultComponentProps} from "../../_base/types";
import FormGroup from "@material-ui/core/FormGroup";
import {FormControlLabel, Switch} from "@material-ui/core";

const SignInSchema = object().shape({
    email: string("Enter your email")
        .email("Invalid name")
        .required("Required"),
    password: string("Enter your password").required("Required"),
    isMaster: bool("Master login")
});

const LoginComponent = ({
    setError
}: DefaultComponentProps): Node => {
    const history = useHistory();
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            isMaster: false
        },
        validationSchema: SignInSchema,
        onSubmit: v => onSubmit(v)
    })

    const onSubmit = ({
        email,
        password,
        isMaster
    }) =>
        login(email, password, isMaster ? "MASTER" : "PLAYER")
            .then(res => {
                storeLoginInformation(res.data.user);
                history.push(Routes.main);
            })
            .catch(errors => {
                setError(errors, "Username or password invalid.");
            });

    return (
        <LoginLayout title="Sign in">
            { classes => 
                <>
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        <FormTextField formik={formik} fieldName="email" label="Email" />
                        <FormTextField formik={formik} fieldName="password" label="Password" type="password" />
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch onChange={formik.handleChange}
                                            name="isMaster"
                                            id="isMaster"
                                            color="primary" />
                                    }
                                label="Master login" />
                        </FormGroup>
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
                            <Link to="#" variant="body2" className={classes.link}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" variant="body2" className={classes.link}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </>
            }
        </LoginLayout>);
};

export default LoginComponent;
