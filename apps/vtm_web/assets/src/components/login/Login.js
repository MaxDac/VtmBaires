// @flow

import React, {useContext} from "react";
import Button from "@mui/material/Button";
import { login } from "../../services/login-service";
import type {Node} from "react";
import {useNavigate} from "react-router-dom";
import {object, string} from 'yup';
import {useFormik} from "formik";
import FormTextField from "../../_base/components/FormTextField";
import {AppRoutes} from "../../AppRouter";
import {checkCharacter, storeSession} from "../../services/session-service";
import {useTheme} from "@mui/material/styles";
import {UtilityContext} from "../../contexts";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {LoginRoutes} from "./LoginRouter";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import {menuIconStyle} from "../_layout/menu/menu-base-utils";
import {useRelayEnvironment} from "react-relay";
import LoginLayout from "./LoginLayout";

const SignInSchema = object().shape({
    email: string("Enter your email")
        .email("Invalid name")
        .required("Required"),
    password: string("Enter your password").required("Required"),
    // remember: bool("Remember me")
});

const LoginComponent = (): Node => {
    const environment = useRelayEnvironment();
    const navigate = useNavigate();
    const theme = useTheme();

    const {
        showUserNotification,
        setWait
    } = useContext(UtilityContext);
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            // remember: true
        },
        validationSchema: SignInSchema,
        onSubmit: v => onSubmit(v)
    });

    const onSubmit = ({
        email,
        password,
        // remember
    }) => {
        setWait(true);

        const handleUnhandledExceptionAtLogin = e => {
            setWait(false);
            console.error("Unhandled error", e);
            showUserNotification({type: 'error', message: "Username or password invalid."});
        };

        window.addEventListener("unhandledrejection", handleUnhandledExceptionAtLogin);

        login(email, password, true)
            .then(res => {
                setWait(false);
                storeSession(res.data);
                setTimeout(() => {
                    navigate(AppRoutes.main);
                }, 200);
                return res;
            })
            // This call is to pre-populate the cache
            .then(_ => checkCharacter(environment))
            .catch(errors => {
                setWait(false);
                showUserNotification({type: 'error', graphqlErrors: errors, message: "Username or password invalid."});
            })
            .finally(() => {
                window.removeEventListener("unhandledrejection", handleUnhandledExceptionAtLogin);
            });
    }

    return (
        <LoginLayout title="Login" icon={<LockOutlinedIcon sx={menuIconStyle} />}>
            <form style={{
                width: '100%', // Fix IE 11 issue.
                marginTop: "10px",
            }} noValidate onSubmit={formik.handleSubmit}>
                <FormTextField formik={formik} fieldName="email" label="Email" type="email" />
                <FormTextField formik={formik} fieldName="password" label="Password" type="password" />
                {/*<FormCheckboxField formik={formik} fieldName="remember" label="Ricorda" />*/}
                <Button type="submit"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        sx={{
                            margin: theme.spacing(3, 0, 2),
                        }}>
                    Accedi
                </Button>
            </form>
            <Box component="div" sx={{textAlign: "center"}}>
                <ButtonGroup variant="outlined" aria-label="login links">
                    <Button onClick={_ => navigate(LoginRoutes.recoverPassword)}>Recupera password</Button>
                    <Button onClick={_ => navigate(AppRoutes.guideMain)}>Guida</Button>
                    <Button onClick={_ => navigate(LoginRoutes.register)}>Registrazione</Button>
                </ButtonGroup>
            </Box>
        </LoginLayout>
    );
};

export default LoginComponent;
