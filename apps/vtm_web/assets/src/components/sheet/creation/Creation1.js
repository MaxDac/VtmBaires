// @flow

import React, {useContext, useState} from "react";
import MainLayout from "../../MainLayout";
import Typography from "@mui/material/Typography";
import {object, string} from "yup";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";
import FormTextField from "../../../_base/components/FormTextField";
import Button from "@mui/material/Button";
import FormSelectField from "../../../_base/components/FormSelectField";
import Grid from "@mui/material/Grid";
import createCharacter from "../../../services/mutations/characters/CreateCharacterMutation";
import {updateCurrentCharacter} from "../../../services/session-service";
import {Routes} from "../../../AppRouter";
import FormFileDropField from "../../../_base/components/FormFileDropField";
import {UtilityContext} from "../../../contexts";
import {clansQuery} from "../../../services/queries/info/ClansQuery";
import type {ClansQuery} from "../../../services/queries/info/__generated__/ClansQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {useRelayEnvironment} from "react-relay";
import useStyles from "../../Main.Layout.Style";

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

    const { showUserNotification } = useContext(UtilityContext);

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
                    updateCurrentCharacter({
                        id: response.createCharacter.id,
                        name: response.createCharacter.name ?? "No name available"
                    });
                }

                history.push(Routes.creation2);
            })
            .catch(e => showUserNotification({ type: 'error', graphqlError: e, message: "An error happened while creating the user." }));
    }

    return (
        <MainLayout>
            <div className={classes.centeredContainer}>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography>
                                In questa prima parte della registrazione di un nuovo personaggio, è necessario già avere ben chiara la sua storia, il suo aspetto e la sua interpretazione.
                            </Typography>
                            <Typography>
                                Vampiri: la Masquerade è principalmente un gioco di inerpretazione, quindi questa prima schermata di creazione è la più importante di tutte. Dacci una idea chiara del personaggio che vuoi interpretare.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormTextField formik={formik} fieldName="name" label="Nome" autoComplete="Nome" fullWidth={false} className="form-control" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {clanSelect()}
                        </Grid>
                        <Grid item xs={12}>
                            <FormFileDropField fieldName="avatar" showPreview={true} changed={avatarChanged} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField formik={formik} fieldName="description" label="Descrizione" autoComplete="Descrizione" rows={5} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField formik={formik} fieldName="biography" label="Biografia" autoComplete="Biografia" rows={5} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Continua
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </MainLayout>
    )
}

export default Creation1;
