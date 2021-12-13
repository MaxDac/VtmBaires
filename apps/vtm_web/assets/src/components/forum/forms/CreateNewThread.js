// @flow

import React, {useContext} from "react";
import {object, string} from "yup";
import useForumSections from "../../../services/queries/forum/GetForumSectionsQuery";
import {firstOrDefault} from "../../../_base/utils";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";
import CreateNewThreadMutation from "../../../services/mutations/forum/CreateNewThreadMutation";
import {useSession} from "../../../services/session-service";
import {UtilityContext} from "../../../contexts";
import {useRelayEnvironment} from "react-relay";
import { MainRoutes } from "../../MainRouter";
import ThreadForm from "./ThreadForm";

type Props = {
    sectionId: string;
}

const CreateNewThreadValidationSchema = object().shape({
    title: string("Il titolo del thread").required("Richiesto"),
    description: string("La descrizione del thread")
});

const CreateNewThread = ({sectionId}: Props): any => {
    const history = useHistory();
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);
    const [user, character] = useSession();
    const section = firstOrDefault(useForumSections()?.getForumSections?.filter(s => s?.section?.id === sectionId));

    const goBack = () => history.push(MainRoutes.forumSection(sectionId));

    const onSubmit = ({title, description}) => {
        CreateNewThreadMutation(environment, {
            sectionId: sectionId,
            creatorUserId: user?.id ?? "",
            creatorCharacterId: section?.section?.onGame === true ? character?.id : null,
            title: title,
            description: description
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
        validationSchema: CreateNewThreadValidationSchema,
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
                    formik={formik} />
    );
};

export default CreateNewThread;
