// @flow

import React, {useContext} from "react";
import {object, string} from "yup";
import {useFormik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {UtilityContext} from "../../contexts";
import {useRelayEnvironment} from "react-relay";
import { MainRoutes } from "../MainRouter";
import ThreadForm from "./forms/ThreadForm";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {getForumThreadQuery} from "../../services/queries/forum/GetForumThreadQuery";
import type {GetForumThreadQuery} from "../../services/queries/forum/__generated__/GetForumThreadQuery.graphql";
import ModifyThreadMutation from "../../services/mutations/forum/ModifyThreadMutation";
import {handleMutation} from "../../_base/utils";
import type {GenericReactComponent} from "../../_base/types";
import RequireAuth from "../_auth/RequireAuth";
import RouterPage from "../RouterPage";

const CreateNewThreadValidationSchema = object().shape({
    title: string("Il titolo del thread").required("Richiesto"),
    description: string("La descrizione del thread")
});

const ModifyThread = (): GenericReactComponent => {
    const {sectionId, threadId} = useParams();
    const navigate = useNavigate();
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);
    const thread = useCustomLazyLoadQuery<GetForumThreadQuery>(getForumThreadQuery, {
        forumThreadId: threadId
    })?.getForumThread;

    const goBack = () => navigate(MainRoutes.forumSection(sectionId));

    const onSubmit = ({title, description}) => {
        handleMutation(() => 
            ModifyThreadMutation(environment, {
                threadId: threadId,
                title: title,
                description: description
            }), showUserNotification, {
                successMessage: "Thread modificato.",
                onCompleted: () => {
                    setTimeout(() => {
                        if (threadId != null && threadId !== "") {
                            navigate(MainRoutes.forumThread(threadId));
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
        <RequireAuth>
            <RouterPage>
                <ThreadForm title={getTitle()}
                            description={getDescription()}
                            goBack={goBack}
                            formik={formik}
                            buttonText="Modifica Thread" />
            </RouterPage>
        </RequireAuth>
    );
};

export default ModifyThread;
