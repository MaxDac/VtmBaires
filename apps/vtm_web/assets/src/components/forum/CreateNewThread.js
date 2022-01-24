// @flow

import React, {useContext} from "react";
import useForumSections from "../../services/queries/forum/GetForumSectionsQuery";
import {firstOrDefault} from "../../_base/utils";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";
import CreateNewThreadMutation from "../../services/mutations/forum/CreateNewThreadMutation";
import {useSession} from "../../services/session-service";
import {UtilityContext} from "../../contexts";
import {useRelayEnvironment} from "react-relay";
import { MainRoutes } from "../MainRouter";
import ThreadForm, {CreateNewThreadValidationSchema} from "./forms/ThreadForm";
import type {GenericReactComponent} from "../../_base/types";
import {isUserMaster} from "../../services/base-types";

type Props = {
    sectionId: string;
}

const CreateNewThread = ({sectionId}: Props): GenericReactComponent => {
    const history = useHistory();
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);
    const [user, character] = useSession();
    const section = firstOrDefault(useForumSections()?.getForumSections?.filter(s => s?.section?.id === sectionId));

    const goBack = () => history.push(MainRoutes.forumSection(sectionId));

    const onSubmit = ({title, description, highlighted}) => {
        CreateNewThreadMutation(environment, {
            sectionId,
            creatorUserId: user?.id ?? "",
            creatorCharacterId: section?.section?.onGame === true ? character?.id : null,
            title,
            description,
            highlighted
        }).then(id => {
            showUserNotification({
                type: "success",
                message: "Nuovo thread creato."
            });

            setTimeout(() => {
                if (id != null && id !== "") {
                    history.push(MainRoutes.forumThread(id));
                }
                else {
                    goBack();
                }
            }, 500);
        }).catch(e => {
            console.error("Remote error", e);
            showUserNotification({
                type: "error",
                graphqlMessage: e,
                message: "Impossibile creare il nuovo thread."
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema: CreateNewThreadValidationSchema(isUserMaster(user)),
        onSubmit
    });

    const getTitle = () => section?.section?.title != null
        ? `Nuovo thread in ${section.section.title}`
        : "Nuovo thread";

    const getDescription = () =>
        "Prima di inserire un nuovo thread, accertati che non ce ne siano altri già attivi con lo stesso scopo."

    return (
        <ThreadForm title={getTitle()}
                    description={getDescription()}
                    goBack={goBack}
                    formik={formik}
                    buttonText="Crea Thread" />
    );
};

export default CreateNewThread;
