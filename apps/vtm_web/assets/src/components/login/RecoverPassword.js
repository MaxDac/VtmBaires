// @flow

import React, {useContext} from "react";
import {object, string} from "yup";
import {useHistory} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {UtilityContext} from "../../contexts";
import {useFormik} from "formik";
import FormTextField from "../../_base/components/FormTextField";
import Button from "@mui/material/Button";
import {requestNewPassword} from "../../services/login-service";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginFrameLayout from "./LoginFrameLayout";
import {LoginRoutes} from "./LoginRouter";
import ButtonGroup from "@mui/material/ButtonGroup";
import {Routes} from "../../AppRouter";
import Box from "@mui/material/Box";
import {menuIconStyle} from "../_layout/Menu";

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
        <LoginFrameLayout title="Recupera la tua password" icon={<ContactMailIcon sx={menuIconStyle} />}>
            <>
                <form style={{
                    width: '100%', // Fix IE 11 issue.
                    marginTop: "10px",
                }} noValidate onSubmit={formik.handleSubmit}>
                    <FormTextField formik={formik} fieldName="email" label="Email" />
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{
                            margin: theme.spacing(3, 0, 2),
                        }}>
                        Recupera la tua password!
                    </Button>
                </form>
                <Box component="div" sx={{textAlign: "center"}}>
                    <ButtonGroup variant="outlined" aria-label="recover password links">
                        <Button onClick={_ => history.push(LoginRoutes.login)}>Torna al Login</Button>
                        <Button onClick={_ => history.push(Routes.guideMain)}>Guida</Button>
                        <Button onClick={_ => history.push(LoginRoutes.register)}>Registrazione</Button>
                    </ButtonGroup>
                </Box>
            </>
        </LoginFrameLayout>
    );
}

export default RecoverPassword;
