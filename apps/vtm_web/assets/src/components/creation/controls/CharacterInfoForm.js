// @flow

import React, {useState} from "react";
import {object, string} from "yup";
import useStyles from "../../Main.Layout.Style";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {useFormik} from "formik";
import FormSelectField from "../../../_base/components/FormSelectField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextField from "../../../_base/components/FormTextField";
import FormFileDropField from "../../../_base/components/FormFileDropField";
import Button from "@mui/material/Button";
import type { CharacterCreationRequest } from "../../../services/mutations/npcs/__generated__/CreateNewNpcMutation.graphql";
import type {CreationClansQuery} from "../../../services/queries/info/__generated__/CreationClansQuery.graphql";
import {creationClansQuery} from "../../../services/queries/info/CreationClansQuery";
import {Link} from "react-router-dom";
import {GuideRoutes} from "../../guides/GuidesMain";
import {getUrlValidationMatchString} from "../../../_base/utils";
import {avatarHeight, avatarWidth} from "../../character/sheet-sections/sections/CharacterSheetDescriptionSection";

type Props = {
    onSubmit: CharacterCreationRequest => void;
}

const CharacterInfoFormValidationSchema = object().shape({
    name: string("Enter your character name").required("Required"),
    description: string("Enter your character description").required("Required"),
    biography: string("Enter your character biography").required("Required"),
    avatar: string("Il tuo avatar").matches(getUrlValidationMatchString())
});

const CharacterInfoForm = ({onSubmit}: Props): any => {
    const classes = useStyles();
    const clans = useCustomLazyLoadQuery<CreationClansQuery>(creationClansQuery, {})?.creationClans;

    const [chatAvatar, setChatAvatar] = useState<?string>(null);

    const [humanClan,] = clans?.filter(c => c?.name === "Umano") ?? [];

    const formik = useFormik({
        initialValues: {
            name: "",
            clanId: humanClan?.id ?? "",
            avatar: "",
            description: "",
            biography: ""
        },
        validationSchema: CharacterInfoFormValidationSchema,
        onSubmit: v => onSubmitInternal(v)
    });

    const clanSelect = () => {
        if (clans != null && clans.length > 0) {
            const values = clans.map(clan => [clan?.id ?? "", clan?.name ?? ""]);
            return <FormSelectField formik={formik}
                                    fieldName="clanId"
                                    label="Clan"
                                    values={values} />
        }

        return <></>
    }

    const avatarChanged = (_a, ca) => {
        setChatAvatar(ca);
    }

    const onSubmitInternal = data => {
        onSubmit({
            ...data,
            chatAvatar,
        });
    }

    return (
        <div className={classes.centeredContainer}>
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography paragraph>
                            In questa prima parte della registrazione di un nuovo personaggio, &egrave; necessario gi&agrave;
                            avere ben chiara la sua storia, il suo aspetto e la sua interpretazione. Ti invitiamo a
                            leggere la <Link to={GuideRoutes.creation}
                                             target="_blank"
                                             rel="noreferrer">Guida</Link> per ulterior informazioni.
                            Vampiri: la Masquerade &egrave; principalmente un gioco di interpretazione, quindi questa
                            prima schermata di creazione &egrave; la pi&ugrave; importante di tutte, servir&agrave; a darci
                            un'idea del personaggio che vuoi interpretare.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField formik={formik} fieldName="name" label="Nome" autoComplete="Nome" fullWidth={false} className="form-control" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {clanSelect()}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography paragraph>
                            Di seguito, puoi caricare una immagine, possibilmente quadrata, per poter rappresentare il
                            tuo personaggio nelle chat e nei messaggi.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormFileDropField fieldName="avatar"
                                           changed={avatarChanged}
                                           showChatPreviews={true}
                                           showLargePreview={false} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormTextField formik={formik}
                                       fieldName="avatar"
                                       label={`URL Avatar Scheda (${avatarWidth} * ${avatarHeight})`}
                                       autoComplete="Avatar URL" />
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
                            variant="outlined"
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
