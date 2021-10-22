// @flow

import React, {useContext} from "react";
import ForumFormLayout from "../layout/ForumFormLayout";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {getForumThreadQuery} from "../../../services/queries/forum/GetForumThreadQuery";
import type {GetForumThreadQuery} from "../../../services/queries/forum/__generated__/GetForumThreadQuery.graphql";
import {useHistory} from "react-router-dom";
import {object, string} from "yup";
import {useFormik} from "formik";
import CreateNewPostMutation from "../../../services/mutations/forum/CreateNewPostMutation";
import {useRelayEnvironment} from "react-relay";
import {useSession} from "../../../services/session-service";
import {UtilityContext} from "../../../contexts";
import FormTextField from "../../../_base/components/FormTextField";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/styles";
import { MainRoutes } from "../../MainRouter";

type Props = {
    threadId: string
}

const CreateNewPostValidationSchema = object().shape({
    text: string("Il testo dell'intervento").required("Richiesto")
});

const CreateNewPost = ({threadId}: Props): any => {
    const history = useHistory();
    const theme = useTheme();
    const {showUserNotification} = useContext(UtilityContext);

    const environment = useRelayEnvironment();
    const [user, character] = useSession();
    const thread = useCustomLazyLoadQuery<GetForumThreadQuery>(getForumThreadQuery, {
        forumThreadId: threadId
    })?.getForumThread?.thread;

    const onSubmit = ({text}) => {
        CreateNewPostMutation(environment, {
            forumThreadId: threadId,
            creatorUserId: user?.id ?? "",
            creatorCharacterId: character?.id,
            text: text
        }).then(_ => {
            showUserNotification({type: "success", message: "Post creato!"})
        }).catch(e => {
            console.error("Error while saving the post!", e);
            showUserNotification({
                type: "error",
                graphqlError: e,
                message: "Il post non è stato salvato correttamente."
            });
        }).finally(() => {
            setTimeout(() => goBack(), 500);
        })
    };

    const formik = useFormik({
        initialValues: {
            text: ""
        },
        validationSchema: CreateNewPostValidationSchema,
        onSubmit
    })

    const goBack = () => history.push(MainRoutes.forumThread(threadId));

    const getTitle = () => thread?.title != null
        ? `Nuovo post in ${thread.title}`
        : "Nuovo post";

    return (
        <ForumFormLayout title={getTitle()} goBack={goBack}>
            <form style={{
                width: '100%', // Fix IE 11 issue.
                marginTop: "10px",
            }} noValidate onSubmit={formik.handleSubmit}>
                <FormTextField formik={formik} fieldName="text" label="Testo dell'intervento" fullWidth rows={4} />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                        margin: theme.spacing(3, 0, 2),
                    }}>
                    Crea post
                </Button>
            </form>
        </ForumFormLayout>
    );
}

export default CreateNewPost;
