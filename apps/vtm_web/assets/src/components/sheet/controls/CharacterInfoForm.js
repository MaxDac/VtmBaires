// @flow

import React, {useState} from "react";
import {object, string} from "yup";
import useStyles from "../../Main.Layout.Style";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {ClansQuery} from "../../../services/queries/info/__generated__/ClansQuery.graphql";
import {clansQuery} from "../../../services/queries/info/ClansQuery";
import {useFormik} from "formik";
import FormSelectField from "../../../_base/components/FormSelectField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextField from "../../../_base/components/FormTextField";
import FormFileDropField from "../../../_base/components/FormFileDropField";
import Button from "@mui/material/Button";
import type { CharacterCreationRequest } from "../../../services/mutations/npcs/__generated__/CreateNewNpcMutation.graphql";

type Props = {
    onSubmit: CharacterCreationRequest => void;
}

const CharacterInfoFormValidationSchema = object().shape({
    name: string("Enter your character name").required("Required"),
    description: string("Enter your character description").required("Required"),
    biography: string("Enter your character biography").required("Required")
});

const CharacterInfoForm = ({onSubmit}: Props): any => {
    const classes = useStyles();
    const clans = useCustomLazyLoadQuery<ClansQuery>(clansQuery, {})?.clans;

    const [avatar, setAvatar] = useState<?string>(null);
    const [chatAvatar, setChatAvatar] = useState<?string>(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            clanId: "",
            description: "",
            biography: ""
        },
        validationSchema: CharacterInfoFormValidationSchema,
        onSubmit: v => onSubmitInternal(v)
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

    const onSubmitInternal = data => {
        onSubmit({
            ...data,
            avatar,
            chatAvatar,
        });
    }

    return (
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
    )
}

export default CharacterInfoForm;
