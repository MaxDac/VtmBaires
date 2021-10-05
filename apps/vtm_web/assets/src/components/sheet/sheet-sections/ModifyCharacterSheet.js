// @flow

import React, {useContext, useRef, useState} from "react";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import FormFileDropField from "../../../_base/components/FormFileDropField";
import FormTextField from "../../../_base/components/FormTextField";
import {object, string} from "yup";
import {useFragment, useRelayEnvironment} from "react-relay";
import type {CharacterFragments_characterSheet$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import {characterSheetFragment} from "../../../services/queries/character/CharacterFragments";
import MainLayout from "../../MainLayout";
import {useFormik} from "formik";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../Main.Layout.Style";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetCharacterQuery} from "../../../services/queries/character/__generated__/GetCharacterQuery.graphql";
import {getCharacterQuery} from "../../../services/queries/character/GetCharacterQuery";
import {useUserCharactersQuery} from "../../../services/queries/accounts/UserCharactersQuery";
import {useSession} from "../../../services/session-service";
import {Redirect, useHistory} from "react-router-dom";
import {Routes} from "../../../AppRouter";
import ChangeCharacterSheetInfoMutation from "../../../services/mutations/characters/ChangeCharacterSheetInfoMutation";
import {UtilityContext} from "../../../contexts";

type Props = {
    id: string;
}

const ModifyCharacterValidationSchema = object().shape({
    description: string("Descrizione del personaggio"),
    biography: string("Biografia del personaggio")
});

const ModifyCharacterSheet = ({id}: Props): any => {
    const history = useHistory();
    const {showUserNotification} = useContext(UtilityContext);
    const environment = useRelayEnvironment();
    const [avatar, setAvatar] = useState<?string>(null);
    const [chatAvatar, setChatAvatar] = useState<?string>(null);

    const [user,] = useSession();
    const userCharacters = useUserCharactersQuery();
    const character =
        useCustomLazyLoadQuery<GetCharacterQuery>(getCharacterQuery, {id})?.getCharacter;

    const formRef = useRef();

    const sheet = useFragment<?CharacterFragments_characterSheet$key>(
        characterSheetFragment,
        character);

    const onSubmit = values => {
        const completeValues = {
            ...values,
            avatar,
            chatAvatar
        };

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
                history.push(Routes.sheet(id, true));
            });
    }

    const formik = useFormik({
        validationSchema: ModifyCharacterValidationSchema,
        initialValues: {
            description: sheet?.description,
            biography: sheet?.biography
        },
        onSubmit
    });

    const avatarChanged = (a, ca) => {
        setAvatar(a);
        setChatAvatar(ca);
    };

    const formSectionStyle = {
        margin: "10px"
    }

    if (!user?.role === "master" && userCharacters?.some(c => c.id === character?.id) === false) {
        return (
            <Redirect to={Routes.sheet(id)} />
        );
    }

    return (
        <MainLayout>
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
                    <FormFileDropField fieldName="avatar" showPreview={true} changed={avatarChanged} />
                </Grid>
                <Grid item xs={12} sx={formSectionStyle}>
                    <FormTextField formik={formik} fieldName="description" label="Description" autoComplete="Description" rows={5} />
                </Grid>
                <Grid item xs={12} sx={formSectionStyle}>
                    <FormTextField formik={formik} fieldName="biography" label="Biography" autoComplete="Biography" rows={5} />
                </Grid>
                <Grid item xs={12} sx={formSectionStyle}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary">
                        Salva
                    </Button>
                </Grid>
            </form>
        </MainLayout>
    );
}

export default ModifyCharacterSheet;
