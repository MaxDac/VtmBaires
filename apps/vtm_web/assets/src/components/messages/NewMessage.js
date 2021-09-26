// @flow

import React, {useMemo} from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {getMessageQuery} from "../../services/queries/messages/GetMessageQuery";
import {bool, object, string} from "yup";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import MainLayout from "../Main.Layout";
import FormTextField from "../../_base/components/FormTextField";
import FormCheckboxField from "../../_base/components/FormCheckboxField";
import {allCharactersQuery} from "../../services/queries/character/AllCharactersQuery";
import type {AllCharactersQuery} from "../../services/queries/character/__generated__/AllCharactersQuery.graphql";
import {useSessionQuery} from "../../services/queries/accounts/SessionQuery";
import Button from "@mui/material/Button";
import FormSelectField from "../../_base/components/FormSelectField";
import {useTheme} from "@mui/styles";
import ReturnToMessagesControl from "./components/ReturnToMessagesControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type {GetMessageQuery} from "../../services/queries/messages/__generated__/GetMessageQuery.graphql";

type Props = {
    replyMessageId?: string;
}

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

type SubmitProperties = {
    subject: string;
    text: string;
    onGame: boolean;
    characterId?: ?string;
    userId?: ?string;
};

type MessageTemplateProps = {
    submitted: SubmitProperties => void,
    isReply: boolean;
    characterId?: string,
    userId?: string,
    onGame?: boolean
}

const MessageTemplate = ({submitted, isReply, characterId = "", userId = "", onGame = false}: MessageTemplateProps) => {
    const theme = useTheme();
    const allUsers = useSessionQuery()?.usersList;
    const allCharacters = useCustomLazyLoadQuery<AllCharactersQuery>(allCharactersQuery, {})?.charactersList;

    const formik = useFormik({
        validationSchema: MessageSchema,
        initialValues: {
            subject: "",
            text: "",
            onGame: onGame,
            characterId: characterId,
            userId: userId
        },
        onSubmit: submitted
    });

    const userValues = useMemo((): Array<[string, string]> => {
        const values: Array<[string, string]> = allUsers
            // $FlowFixMe
            ?.map(v => [v.id, v.name]) ?? [];

        return [["", "None"]].concat(values);
    }, [allUsers]);

    const characterValues = useMemo((): Array<[string, string]> => {
        const values: Array<[string, string]> = allCharacters
            // $FlowFixMe
            ?.map(v => [v.id, v.name]) ?? [];

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
                    <FormTextField formik={formik} fieldName="subject" label="Titolo" />
                </Grid>
                <Grid item xs={12}>
                    <FormTextField formik={formik} fieldName="text" label="Testo del messaggio" rows={4} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
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

const ReplyToMessage = (messageId: string, onSubmit: SubmitProperties => void) => {
    const message = useCustomLazyLoadQuery<GetMessageQuery>(
        getMessageQuery,
        {messageId: messageId},
        {
            fetchPolicy: "store-and-network"
        })?.getMessage;

    const onSubmitInternal = (e: SubmitProperties) => onSubmit({
        ...e,
        replyToMessageId: message?.id
    });

    return (
        <Grid container>
            <Grid item xs={12}>
                <Card sx={{margin: "20px"}}>
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{padding: "10px"}}>
                            Messaggio precedente
                        </Typography>
                        <Typography>
                            {message?.text}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <MessageTemplate submitted={onSubmitInternal}
                                 characterId={message?.senderCharacter?.id}
                                 userId={message?.senderUser?.id}
                                 onGame={message?.onGame === true}
                                 isReply={true} />
            </Grid>
        </Grid>
    );
}

const BrandNewMessage = onSubmit => {
    return (
        <MessageTemplate submitted={onSubmit} isReply={false} />
    );
}

const NewMessage = (props: Props): any => {
    const onSubmit = (e: SubmitProperties) => console.log("submitting", e);

    const editor = () =>
        props.replyMessageId != null
            ? ReplyToMessage(props.replyMessageId, onSubmit)
            : BrandNewMessage(onSubmit);

    return (
        <MainLayout>
            <ReturnToMessagesControl>
                {editor()}
            </ReturnToMessagesControl>
        </MainLayout>
    );
}

export default NewMessage;
