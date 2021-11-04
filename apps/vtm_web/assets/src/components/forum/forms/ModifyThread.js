// @flow

import React, {useContext} from "react";
import {object, string} from "yup";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";
import {UtilityContext} from "../../../contexts";
import {useRelayEnvironment} from "react-relay";
import { MainRoutes } from "../../MainRouter";
import ThreadForm from "./ThreadForm";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {getForumThreadQuery} from "../../../services/queries/forum/GetForumThreadQuery";
import type {GetForumThreadQuery} from "../../../services/queries/forum/__generated__/GetForumThreadQuery.graphql";
import ModifyThreadMutation from "../../../services/mutations/forum/ModifyThreadMutation";
import { handleMutation } from "../../../_base/utils";

type Props = {
    sectionId: string;
    threadId: string;
}

const CreateNewThreadValidationSchema = object().shape({
    title: string("Il titolo del thread").required("Richiesto"),
    description: string("La descrizione del thread")
});

const ModifyThread = ({sectionId, threadId}: Props): any => {
    const history = useHistory();
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);
    const thread = useCustomLazyLoadQuery<GetForumThreadQuery>(getForumThreadQuery, {
        forumThreadId: threadId
    })?.getForumThread;

    const goBack = () => history.push(MainRoutes.forumSection(sectionId));

    const onSubmit = ({title, description}) => {
        handleMutation(() => 
            ModifyThreadMutation(environment, {
                threadId: threadId,
                title: title,
                text: description
            }), showUserNotification, {
                successMessage: "Thread modificato.",
                onCompleted: () => {
                    setTimeout(() => {
                        if (threadId != null && threadId !== "") {
                            history.push(MainRoutes.forumThread(threadId));
                        }
                        else {
                            goBack();
                        }
                    }, 500);
                }
            });
    };

    const formik = useFormik({
        initialValues: {
            title: thread?.title,
            description: thread?.description
        },
        validationSchema: CreateNewThreadValidationSchema,
        onSubmit
    });

    const getTitle = () => thread?.title != null
        ? `Modifica thread ${thread.title}`
        : "Modifica thread";

    const getDescription = () => "";

    return (
        <ThreadForm title={getTitle()}
                    description={getDescription()}
                    goBack={goBack}
                    formik={formik} />
    );
};

export default ModifyThread;
