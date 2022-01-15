// @flow

import React, {useMemo} from "react";
import {useTheme} from "@mui/material/styles";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {AllUsersQuery} from "../../../services/queries/accounts/__generated__/AllUsersQuery.graphql";
import {allUsersQuery} from "../../../services/queries/accounts/AllUsersQuery";
import type {AllCharactersQuery} from "../../../services/queries/character/__generated__/AllCharactersQuery.graphql";
import {allCharactersQuery} from "../../../services/queries/character/AllCharactersQuery";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import FormSelectField from "../../../_base/components/FormSelectField";
import FormCheckboxField from "../../../_base/components/FormCheckboxField";
import FormTextField from "../../../_base/components/FormTextField";
import Button from "@mui/material/Button";
import {bool, object, string} from "yup";
import type {SubmitProperties} from "../NewMessage";
import { orderAlphabetically } from "../../../_base/utils";

const MessageSchema = object().shape({
    subject: string("Subject: ").required("Required"),
    text: string("Message content: ").required("Required"),
    onGame: bool("Messaggio in game").required("Required"),
    characterId: string("Destinatario").when("onGame", {
        is: true,
        then: string().required("Required")
    }),
    userId: string("Destinatario").when("onGame", {
        is: false,
        then: string().required("Required")
    }),
    // Not necessary, kept for future reference about how to represent a nullable value in the form using yup
    // replyToMessageId: string().nullable(true)
});

type Props = {
    submitted: SubmitProperties => void;
    isReply: boolean;
    characterId?: string;
    userId?: string;
    onGame?: boolean;
    toUserId?: ?string;
    toCharacterId?: ?string;
    subject?: string;
};

const MessageTemplate = ({
                             submitted,
                             isReply,
                             characterId = "",
                             userId = "",
                             toUserId = null,
                             toCharacterId = null,
                             onGame = false,
                             subject = ""
}: Props): any => {
    const theme = useTheme();
    const allUsers = useCustomLazyLoadQuery<AllUsersQuery>(allUsersQuery, {})?.allUsers;
    const allCharacters = useCustomLazyLoadQuery<AllCharactersQuery>(allCharactersQuery, {})?.charactersList;

    const cleanInput = (values: SubmitProperties) => {
        if (values.characterId != null && values.characterId !== "") {
            return {
                ...values,
                userId: null
            };
        }

        return values;
    }

    const onSubmit = (values: SubmitProperties) => {
        const cleanedInput = cleanInput(values);
        submitted(cleanedInput);
    };

    const inGameOrCharacterNotNull = toCharacterId != null ? true : onGame;

    const formik = useFormik({
        validationSchema: MessageSchema,
        initialValues: {
            subject: subject,
            text: "",
            onGame: inGameOrCharacterNotNull,
            userId: userId === "" ? (toUserId ?? "") : userId,
            characterId: characterId === "" ? (toCharacterId ?? "") : characterId
        },
        onSubmit
    });

    const userValues = useMemo((): Array<[string, string]> => {
        const values: Array<[string, string]> = allUsers
            ?.map(v => [v?.id ?? "", v?.name ?? ""])
            ?.sort(([_aId, aName], [_bId, bName]) => orderAlphabetically(aName, bName)) ?? [];

        return [["", "None"]].concat(values);
    }, [allUsers]);

    const characterValues = useMemo((): Array<[string, string]> => {
        const values: Array<[string, string]> = allCharacters
            ?.map(v => [v?.id ?? "", v?.name ?? ""])
            ?.sort(([_aId, aName], [_bId, bName]) => orderAlphabetically(aName, bName)) ?? [];

        return [["", "None"]].concat(values);
    }, [allCharacters]);

    const isInGame = () => formik.values["onGame"];

    const receiverControl = () =>
        isInGame()
            ? (
                <Grid item xs={12} sm={6}>
                    <FormSelectField formik={formik}
                                     fieldName="characterId"
                                     label="Destinatario"
                                     values={characterValues} />
                </Grid>
            )
            : (
                <Grid item xs={12} sm={6}>
                    <FormSelectField formik={formik}
                                     fieldName="userId"
                                     label="Destinatario"
                                     values={userValues} />
                </Grid>
            );

    const typeSelector = () =>
        isReply
            ? (<></>)
            : (
                <>
                    <Grid item xs={12} sm={6}>
                        <FormCheckboxField formik={formik}
                                           fieldName="onGame"
                                           label="Messaggio in Game?"/>
                    </Grid>
                    {receiverControl()}
                </>
            );

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container>
                {typeSelector()}
                <Grid item xs={12}>
                    <FormTextField formik={formik}
                                   fieldName="subject"
                                   label="Titolo" />
                </Grid>
                <Grid item xs={12}>
                    <FormTextField formik={formik}
                                   fieldName="text"
                                   label="Testo del messaggio"
                                   multiline
                                   minRows={4} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        sx={{
                            margin: theme.spacing(3, 0, 2),
                        }}>
                        Invia
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default MessageTemplate;
