// @flow

import React from "react";
import MainLayout from "../main/Main.Layout";
import Typography from "@material-ui/core/Typography";
import {object, string} from "yup";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";
import FormTextField from "../../_base/components/FormTextField";
import Button from "@material-ui/core/Button";
import {useClans} from "../../_base/hooks/useClans";
import FormSelectField from "../../_base/components/FormSelectField";
import Grid from "@material-ui/core/Grid";
import createCharacter from "../../services/queries/character/create-character-mutation";

const Creation1ValidationSchema = object().shape({
    name: string("Enter your name").required("Required"),
    description: string("Enter your description").required("Required"),
    background: string("Enter your background").required("Required")
});

const Creation1 = (setError: (string, string) => void) => {
    const history = useHistory();
    const clans = useClans();

    const formik = useFormik({
        initialValues: {
            name: "",
            clanId: "",
            description: "",
            biography: ""
        },
        validationSchema: Creation1ValidationSchema,
        onSubmit: v => onSubmit(v)
    });

    const clanSelect = () => {
        if (clans && clans.length > 0) {
            const values = clans.map(({id, name}) => [id, name]);
            return <FormSelectField formik={formik} fieldName="clanId" label="Clan" values={values}/>
        }

        return <></>
    }

    const onSubmit = data => {
        createCharacter(data)
            .then(response => {
                console.log("response", response);
            })
            .catch(error => console.error("Error!", error));
    }

    return (
        <MainLayout>
            { classes =>
                <div className={classes.centeredContainer}>
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography>
                                    In the first step of the creation of your character, you will have to determine the general information of it. You can be brief in this part, you will have the possibility to change it at a later time.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField formik={formik} fieldName="name" label="Name" autoComplete="Name" fullWidth={false} className="form-control" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {clanSelect()}
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField formik={formik} fieldName="description" label="Description" autoComplete="Description" rows={5} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField formik={formik} fieldName="biography" label="Biography" autoComplete="Biography" rows={5} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            }
        </MainLayout>
    )
}

export default Creation1;
