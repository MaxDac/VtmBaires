// @flow

import React, {useContext, useRef, useState} from "react";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import FormFileDropField from "../../../_base/components/FormFileDropField";
import FormTextField from "../../../_base/components/FormTextField";
import {object, string} from "yup";
import {useFragment, useRelayEnvironment} from "react-relay";
import type {CharacterFragments_characterSheet$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import {characterOffFragment, characterSheetFragment} from "../../../services/queries/character/CharacterFragments";
import {useFormik} from "formik";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../Main.Layout.Style";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetCharacterQuery} from "../../../services/queries/character/__generated__/GetCharacterQuery.graphql";
import {getCharacterQuery} from "../../../services/queries/character/GetCharacterQuery";
import {useUserCharactersQuery} from "../../../services/queries/accounts/UserCharactersQuery";
import {useSession} from "../../../services/session-service";
import {Redirect, useHistory} from "react-router-dom";
import ChangeCharacterSheetInfoMutation from "../../../services/mutations/characters/ChangeCharacterSheetInfoMutation";
import {UtilityContext} from "../../../contexts";
import { MainRoutes } from "../../MainRouter";
import type {CharacterFragments_characterOff$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterOff.graphql";
import {getUrlValidationMatchString} from "../../../_base/utils";

type Props = {
    id: string;
}

const ModifyCharacterValidationSchema = object().shape({
    description: string("Descrizione del personaggio").required(),
    avatar: string("Il tuo avatar").matches(getUrlValidationMatchString()),
    biography: string("Biografia del personaggio").required(),
    soundtrack: string("Soundtrack").matches(getUrlValidationMatchString()),
    off: string("Off")
});

const ModifyCharacterSheet = ({id}: Props): any => {
    const history = useHistory();
    const {showUserNotification} = useContext(UtilityContext);
    const environment = useRelayEnvironment();

    const [chatAvatar, setChatAvatar] = useState<?string>(null);

    const [user,] = useSession();
    const userCharacters = useUserCharactersQuery();
    const character =
        useCustomLazyLoadQuery<GetCharacterQuery>(getCharacterQuery, {id})?.getCharacter;

    const formRef = useRef();

    const sheet = useFragment<?CharacterFragments_characterSheet$key>(
        characterSheetFragment,
        character);

    const offSheet = useFragment<?CharacterFragments_characterOff$key>(
        characterOffFragment,
        character);

    const onSubmit = values => {
        const completeValues = chatAvatar != null
            ? {
                ...values,
                chatAvatar
            }
            : values;

        ChangeCharacterSheetInfoMutation(environment, id, completeValues)
            .then(c => {
                if (c != null) {
                    showUserNotification({type: "success", message: "Il personaggio è stato salvato correttamente"});
                }
            })
            .catch(e => {
                console.error("Error while saving character info", e);
                showUserNotification({type: "error", message: "C'è stato un errore salvando il personaggio."});
            })
            .finally(() => {
                history.push(MainRoutes.sheet(id, true));
            });
    }

    const formik = useFormik({
        validationSchema: ModifyCharacterValidationSchema,
        initialValues: {
            description: sheet?.description,
            biography: sheet?.biography,
            avatar: sheet?.avatar,
            soundtrack: offSheet?.soundtrack,
            off: offSheet?.off
        },
        onSubmit
    });

    const avatarChanged = (_a, ca) => {
        setChatAvatar(ca);
    };

    const formSectionStyle = {
        margin: "10px"
    }

    if (!user?.role === "master" && userCharacters?.some(c => c.id === character?.id) === false) {
        return (
            <Redirect to={MainRoutes.sheet(id)} />
        );
    }

    return (
        <form ref={formRef} noValidate onSubmit={formik.handleSubmit}>
            <Grid item xs={12} sx={formSectionStyle}>
                <Typography sx={{
                    ...mainFontFamily,
                    fontSize: "24px",
                    margin: "20px"
                }}>
                    Modifica il tuo personaggio
                </Typography>
            </Grid>
            <Grid item xs={12} sx={formSectionStyle}>
                <FormFileDropField fieldName="avatar"
                                   changed={avatarChanged}
                                   showChatPreviews={true}
                                   showLargePreview={false} />
            </Grid>
            <Grid item xs={12}>
                <FormTextField formik={formik} fieldName="avatar" label="URL Avatar Scheda (270 * 400)" autoComplete="Avatar URL" />
            </Grid>
            <Grid item xs={12} sx={formSectionStyle}>
                <FormTextField formik={formik} fieldName="description" label="Description" autoComplete="Description" rows={5} />
            </Grid>
            <Grid item xs={12} sx={formSectionStyle}>
                <FormTextField formik={formik} fieldName="biography" label="Biography" autoComplete="Biography" rows={5} />
            </Grid>
            <Grid item xs={12}>
                <FormTextField formik={formik} fieldName="soundtrack" label="Soundtrack" autoComplete="Soundtrack" />
            </Grid>
            <Grid item xs={12} sx={formSectionStyle}>
                <Typography paragraph>
                    Nella sezione Off potete mettere tutto ci&ograve; che volete condividere del vostro personaggio
                    col resto dei giocatori. Si consiglia di non condividere troppe informazioni del personaggio per
                    evitare <i>metaplay</i>.
                    Il testo, ad ogni modo, non è libero: potrete utilizzare i tag messi a disposizione dal markdown
                    concesso. Potete trovare la documentazione completa del markdown concessa al
                    seguente <a href="https://commonmark.org/help/"
                              target="_blank"
                              rel="noreferrer">link</a>, e un esempio al
                    seguente <a href="https://remarkjs.github.io/react-markdown/"
                             target="_blank"
                             rel="noreferrer">link</a>.
                </Typography>
            </Grid>
            <Grid item xs={12} sx={formSectionStyle}>
                <FormTextField formik={formik} fieldName="off" label="Testo Sezione Off" autoComplete="Testo Sezione Off" rows={15} />
            </Grid>
            <Grid item xs={12} sx={formSectionStyle}>
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary">
                    Salva
                </Button>
            </Grid>
        </form>
    );
}

export default ModifyCharacterSheet;
