// @flow

import React, {useContext} from "react";
import {object, string} from "yup";
import {Link, useHistory} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {UtilityContext} from "../../contexts";
import {useFormik} from "formik";
import FormTextField from "../../_base/components/FormTextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {requestNewPassword} from "../../services/login-service";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginFrameLayout from "./LoginFrameLayout";
import {LoginRoutes} from "./LoginRouter";

const RecoverPasswordSchema = object().shape({
    email: string("Enter your email")
        .email("Invalid name")
        .required("Required")
});

const RecoverPassword = (): any => {
    const history = useHistory();
    const theme = useTheme();
    const {showUserNotification, setWait} = useContext(UtilityContext);

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: RecoverPasswordSchema,
        onSubmit: v => onSubmit(v)
    });

    const onSubmit = ({email}) => {
        setWait(true);

        requestNewPassword(email)
            .then(_r => {
                showUserNotification({
                    type: "success",
                    message: "Password ristabilita, controlla la tua mail!"
                });
                history.push(LoginRoutes.login);
            })
            .catch(e => {
                console.error("error while retrieving the password", e);
                showUserNotification({
                    type: "error",
                    message: "Non è stato possibile resettare la password, sei sicuro di aver usato questo indirizzo di posta?"
                })
            })
            .finally(() => setWait(false));
    }

    return (
        <LoginFrameLayout title="Recupera la tua password" icon={<ContactMailIcon />}>
            <>
                <form style={{
                    width: '100%', // Fix IE 11 issue.
                    marginTop: "10px",
                }} noValidate onSubmit={formik.handleSubmit}>
                    <FormTextField formik={formik} fieldName="email" label="Email" />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            margin: theme.spacing(3, 0, 2),
                        }}>
                        Recupera la tua password!
                    </Button>
                </form>
                <Grid container>
                    <Grid item xs={12}>
                        <Link to="/" variant="body2" sx={{
                            color: theme.palette.grey[50]
                        }}>
                            Login
                        </Link>
                    </Grid>
                </Grid>
            </>
        </LoginFrameLayout>
    );
}

export default RecoverPassword;
