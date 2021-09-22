// @flow

import React, {useContext, useState} from "react";
import MainLayout from "../Main.Layout";
import Typography from "@mui/material/Typography";
import {object, string} from "yup";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";
import FormTextField from "../../_base/components/FormTextField";
import Button from "@mui/material/Button";
import FormSelectField from "../../_base/components/FormSelectField";
import Grid from "@mui/material/Grid";
import createCharacter from "../../services/mutations/characters/CreateCharacterMutation";
import {updateSession} from "../../services/session-service";
import {Routes} from "../../AppRouter";
import FormFileDropField from "../../_base/components/FormFileDropField";
import {UtilityContext} from "../../App";
import {clansQuery} from "../../services/queries/info/ClansQuery";
import type {ClansQuery} from "../../services/queries/info/__generated__/ClansQuery.graphql";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {useRelayEnvironment} from "react-relay";
import useStyles from "../Main.Layout.Style";

const Creation1ValidationSchema = object().shape({
    name: string("Enter your character name").required("Required"),
    description: string("Enter your character description").required("Required"),
    biography: string("Enter your character biography").required("Required")
});

const Creation1 = (): any => {
    const history = useHistory();
    const classes = useStyles();
    const environment = useRelayEnvironment();
    const clans = useCustomLazyLoadQuery<ClansQuery>(clansQuery, {})?.clans;

    const { setError } = useContext(UtilityContext);

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
        if (clans != null && clans.length > 0) {
            const values = clans.map(clan => [clan?.id ?? "", clan?.name ?? ""]);
            return <FormSelectField formik={formik} fieldName="clanId" label="Clan" values={values}/>
        }

        return <></>
    }

    const avatarChanged = (a, ca) => {
        setAvatar(a);
        setChatAvatar(ca);
    }

    const onSubmit = data => {
        createCharacter(environment, {
            ...data,
            avatar,
            chatAvatar,
        })
            .then(response => {
                if (response?.createCharacter != null) {
                    updateSession({
                        selectedCharacter: {
                            id: response.createCharacter.id,
                            name: response.createCharacter.name ?? "No name available"
                        }
                    });
                }

                history.push(Routes.creation2);
            })
            .catch(e => setError({ type: 'error', graphqlError: e, message: "An error happened while creating the user." }));
    }

    return (
        <MainLayout>
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
        </MainLayout>
    )
}

export default Creation1;
