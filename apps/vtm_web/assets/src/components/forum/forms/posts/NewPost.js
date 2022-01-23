// @flow

import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {useRelayEnvironment} from "react-relay";
import {useSession} from "../../../../services/session-service";
import {UtilityContext} from "../../../../contexts";
import {MainRoutes} from "../../../MainRouter";
import ForumPostForm from "../ForumPostForm";
import type {GenericReactComponent} from "../../../../_base/types";
import { CreateNewPostValidationSchema } from "../ManagePost";
import CreateNewPostMutation from "../../../../services/mutations/forum/CreateNewPostMutation";

type NewPostProps = {
    threadId: string;
    title: ?string;
}

const NewPost = ({threadId, title}: NewPostProps): GenericReactComponent => {
    const history = useHistory();
    const [user, character] = useSession();
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);

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

    const getTitle = () => title != null
        ? `Nuovo post in ${title}`
        : "Nuovo post";

    return (<ForumPostForm title={getTitle()}
                           confirmButtonText="Crea post"
                           goBack={goBack}
                           formik={formik} />)
};

export default NewPost;
