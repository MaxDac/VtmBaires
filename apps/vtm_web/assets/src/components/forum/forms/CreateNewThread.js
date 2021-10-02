// @flow

import React, {useContext} from "react";
import {object, string} from "yup";
import useForumSections from "../../../services/queries/forum/GetForumSectionsQuery";
import {firstOrDefault} from "../../../_base/utils";
import ForumFormLayout from "../layout/ForumFormLayout";
import {useFormik} from "formik";
import FormTextField from "../../../_base/components/FormTextField";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/styles";
import {useHistory} from "react-router-dom";
import {Routes} from "../../../AppRouter";
import CreateNewThreadMutation from "../../../services/mutations/forum/CreateNewThreadMutation";
import {useSession} from "../../../services/session-service";
import {UtilityContext} from "../../../contexts";
import {useRelayEnvironment} from "react-relay";

type Props = {
    sectionId: string;
}

const CreateNewThreadValidationSchema = object().shape({
    title: string("Il titolo del thread").required("Richiesto"),
    description: string("La descrizione del thread")
});

const CreateNewThread = ({sectionId}: Props): any => {
    const theme = useTheme();
    const history = useHistory();
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);
    const [user, character] = useSession();
    const section = firstOrDefault(useForumSections()?.getForumSections?.filter(s => s?.id === sectionId));

    const goBack = () => history.push(Routes.forumSection(sectionId));

    const onSubmit = ({title, description}) => {
        CreateNewThreadMutation(environment, {
            sectionId: sectionId,
            creatorUserId: user?.id ?? "",
            creatorCharacterId: section?.onGame === true ? character?.id : null,
            title: title,
            description: description
        }).then(_ => {
            showUserNotification({
                type: "success",
                message: "Nuovo thread creato."
            });
        }).catch(e => {
            console.error("Remote error", e);
            showUserNotification({
                type: "error",
                graphqlMessage: e,
                message: "Impossibile creare il nuovo thread."
            });
        }).finally(() => {
            setTimeout(() => goBack(), 500);
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

    const getTitle = () => section?.title != null
        ? `Nuovo thread in ${section.title}`
        : "Nuovo thread";

    const getDescription = () =>
        "Prima di inserire un nuovo thread, accertati che non ce ne siano altri già attivi con lo stesso scopo."

    return (
        <ForumFormLayout title={getTitle()} description={getDescription()} goBack={goBack}>
            <form style={{
                width: '100%', // Fix IE 11 issue.
                marginTop: "10px",
            }} noValidate onSubmit={formik.handleSubmit}>
                <FormTextField formik={formik} fieldName="title" label="Titolo" fullWidth />
                <FormTextField formik={formik} fieldName="description" label="Descrizione" fullWidth rows={4} />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                        margin: theme.spacing(3, 0, 2),
                    }}>
                    Crea thread
                </Button>
            </form>
        </ForumFormLayout>
    );
}

export default CreateNewThread;
