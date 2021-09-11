// @flow

import React, {useState} from "react";
import MainLayout from "../Main.Layout";
import Typography from "@material-ui/core/Typography";
import {object, string} from "yup";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";
import FormTextField from "../../_base/components/FormTextField";
import Button from "@material-ui/core/Button";
import {useClans} from "../../services/hooks/useClans";
import FormSelectField from "../../_base/components/FormSelectField";
import Grid from "@material-ui/core/Grid";
import createCharacter from "../../services/queries/character/create-character-mutation";
import type {DefaultComponentProps} from "../../_base/types";
import {updateUserSessionInfo} from "../../services/session-service";
import {Routes} from "../../AppRouter";
import FormFileDropField from "../../_base/components/FormFileDropField";

const Creation1ValidationSchema = object().shape({
    name: string("Enter your character name").required("Required"),
    description: string("Enter your character description").required("Required"),
    biography: string("Enter your character biography").required("Required")
});

const Creation1 = ({ setError, openDialog }: DefaultComponentProps): any => {
    const history = useHistory();
    const clans = useClans();

    const [avatar, setAvatar] = useState<?string>(null);
    const [chatAvatar, setChatAvatar] = useState<?string>(null);

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
            const values = clans.map(({id, name}) => [id.toString(), name]);
            return <FormSelectField formik={formik} fieldName="clanId" label="Clan" values={values}/>
        }

        return <></>
    }

    const avatarChanged = (a, ca) => {
        setAvatar(a);
        setChatAvatar(ca);
    }

    const onSubmit = data => {
        createCharacter({
            ...data,
            avatar,
            chatAvatar,
        })
            .then(response => {
                updateUserSessionInfo({
                    selectedCharacter: response
                });
                history.push(Routes.main);
            })
            .catch(error => setError(error, "An error happened while creating the user."));
    }

    return (
        <MainLayout openDialog={openDialog}>
            { (classes: any) =>
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
                                <FormFileDropField fieldName="avatar" showPreview={true} changed={avatarChanged} />
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
