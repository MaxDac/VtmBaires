// @flow

import React, {useContext} from "react";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import createUser from "../../services/mutations/sessions/CreateUserMutation";
import LoginLayout from "./LoginLayout";
import { object, string } from 'yup';
import { useFormik } from "formik";
import FormTextField from "../../_base/components/FormTextField";
import {Link, useHistory} from "react-router-dom";
import type { Node } from "react";
import {Routes} from "../../AppRouter";
import {useTheme} from "@mui/material/styles";
import {UtilityContext} from "../../contexts";
import {useRelayEnvironment} from "react-relay";
import {userNameExists} from "../../services/queries/accounts/UserNameExistsQuery";
import {userEmailExists} from "../../services/queries/accounts/UserEmailExistsQuery";

type CheckerFunction = string => Promise<boolean>;

const SignUpSchema = (nameChecker: CheckerFunction, emailChecker: CheckerFunction) =>
    object().shape({
        email: string("Enter your email")
            .email("Invalid name")
            .required("Required")
            .test("checkEmailUnique", "Questo indirizzo email è già stato usato.", emailChecker),
        name: string("Enter your name")
            .required("Required")
            .test("checkUsernameUnique", "Questo nome è già stato usato.", nameChecker)
    });

const CreateUserComponent = (): Node => {
    const history = useHistory();
    const theme = useTheme();
    const environment = useRelayEnvironment();

    const { setError } = useContext(UtilityContext);

    const checkUsername = (name: string) => userNameExists(environment, name).then(r => r === false);

    const checkEmail = (email: string) => userEmailExists(environment, email).then(r => r === false);

    const formik = useFormik({
        initialValues: {
            email: "",
            name: ""
        },
        validationSchema: SignUpSchema(checkUsername, checkEmail),
        // Validating on change would mean calling the back end every time the name changes.
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: v => onSubmit(v)
    });

    const onSubmit = ({
        email,
        name
    }) => {
        createUser(environment, {
            email,
            name
        })
            .then(_ => {
                setError({ type: "success", message: "User created successfully."});
                setTimeout(() => history.push(Routes.login), 2000);
            })
            .catch(errors => {
                setError({ type: 'error', graphqlError: errors, message: "Username or password invalid." });
            });
    }

    return (
        <LoginLayout title="Register">
            <>
                <form style={{
                    width: '100%', // Fix IE 11 issue.
                    marginTop: "10px",
                }} noValidate onSubmit={formik.handleSubmit}>
                    <FormTextField formik={formik} fieldName="email" label="Email" />
                    <FormTextField formik={formik} fieldName="name" label="Name" />
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
                <Grid container>
                    <Grid item xs>
                        <Link to="#" variant="body2" sx={{
                            color: theme.palette.grey[50]
                        }}>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/" variant="body2" sx={{
                            color: theme.palette.grey[50]
                        }}>
                            Return to Login
                        </Link>
                    </Grid>
                </Grid>
            </>
        </LoginLayout>
    );
};

export default CreateUserComponent;
