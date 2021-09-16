// @flow

import React, {useContext} from "react";
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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox"
import {UtilityContext} from "../../App";

const SignInSchema = object().shape({
    email: string("Enter your email")
        .email("Invalid name")
        .required("Required"),
    password: string("Enter your password").required("Required"),
    remember: bool("Remember me")
});

const LoginComponent = (): Node => {
    const history = useHistory();

    const {
        setError,
        setWait
    } = useContext(UtilityContext);
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: true
        },
        validationSchema: SignInSchema,
        onSubmit: v => onSubmit(v)
    })

    const onSubmit = ({
        email,
        password,
        remember
    }) => {
        setWait(true);

        window.addEventListener("unhandledrejection", e => {
            setWait(false);
            console.error("Unhandled error", e);
            setError({type: 'error', message: "Username or password invalid."});
        })

        login(email, password, remember)
            .then(res => {
                setWait(false);
                storeLoginInformation(res.data.user);
                setTimeout(() => history.push(Routes.main), 200);
            })
            .catch(errors => {
                setWait(false);
                setError({type: 'error', graphqlErrors: errors, message: "Username or password invalid."});
            });
    }

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
                                    <Checkbox onChange={formik.handleChange}
                                              checked={formik.values["remember"]}
                                              name="remember"
                                              id="remember"
                                              color="primary" />
                                    }
                                label="Remember me" />
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
