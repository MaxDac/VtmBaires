// @flow

import React, {useContext} from "react";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import { login } from "../../services/login-service";
import LoginLayout from "./LoginLayout";
import type { Node } from "react";
import { Link, useHistory } from "react-router-dom";
import {bool, object, string} from 'yup';
import { useFormik } from "formik";
import FormTextField from "../../_base/components/FormTextField";
import {Routes} from "../../AppRouter";
import {storeSession} from "../../services/session-service";
import {useTheme} from "@mui/material/styles";
import {UtilityContext} from "../../contexts";
import FormCheckboxField from "../../_base/components/FormCheckboxField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const SignInSchema = object().shape({
    email: string("Enter your email")
        .email("Invalid name")
        .required("Required"),
    password: string("Enter your password").required("Required"),
    remember: bool("Remember me")
});

const LoginComponent = (): Node => {
    const history = useHistory();
    const theme = useTheme();

    const {
        showUserNotification,
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
            showUserNotification({type: 'error', message: "Username or password invalid."});
        });

        login(email, password, remember)
            .then(res => {
                setWait(false);
                storeSession(res.data);
                setTimeout(() => history.push(Routes.main), 200);
            })
            .catch(errors => {
                setWait(false);
                showUserNotification({type: 'error', graphqlErrors: errors, message: "Username or password invalid."});
            });
    }

    return (
        <LoginLayout title="Login" icon={<LockOutlinedIcon />}>
            <>
                <form style={{
                    width: '100%', // Fix IE 11 issue.
                    marginTop: "10px",
                }} noValidate onSubmit={formik.handleSubmit}>
                    <FormTextField formik={formik} fieldName="email" label="Email" />
                    <FormTextField formik={formik} fieldName="password" label="Password" type="password" />
                    <FormCheckboxField formik={formik} fieldName="remember" label="Ricorda" />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            margin: theme.spacing(3, 0, 2),
                        }}>
                        Accedi
                    </Button>
                </form>
                <Grid container>
                    <Grid item xs>
                        <Link to={Routes.recoverPassword} variant="body2" sx={{
                            color: theme.palette.grey[50]
                        }}>
                            Recupera Password
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={Routes.register} variant="body2" sx={{
                            color: theme.palette.grey[50]
                        }}>
                            Registrati
                        </Link>
                    </Grid>
                </Grid>
            </>
        </LoginLayout>);
};

export default LoginComponent;
