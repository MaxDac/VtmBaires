// @flow

import React, {useContext} from "react";
import {useCustomLazyLoadQuery} from "../../../../_base/relay-utils";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {useRelayEnvironment} from "react-relay";
import {useSession} from "../../../../services/session-service";
import {UtilityContext} from "../../../../contexts";
import {MainRoutes} from "../../../MainRouter";
import ForumPostForm from "../ForumPostForm";
import {getForumPostQuery} from "../../../../services/queries/forum/GetForumPostQuery";
import ModifyPostMutation from "../../../../services/mutations/forum/ModifyPostMutation";
import type {GenericReactComponent} from "../../../../_base/types";
import { CreateNewPostValidationSchema } from "../ManagePost";

type ModifyPostProps = {
    threadId: string;
    postId: string;
    title: ?string;
}

const ModifyPost = ({threadId, postId, title}: ModifyPostProps): GenericReactComponent => {
    const history = useHistory();
    const [user,] = useSession();
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);
    const post = useCustomLazyLoadQuery(getForumPostQuery, {
        id: postId
    })?.getForumPost;

    const onSubmit = ({text}) => {
        ModifyPostMutation(environment, {
            postId: postId,
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
            text: post?.text
        },
        validationSchema: CreateNewPostValidationSchema,
        onSubmit
    });

    if (post?.user?.id == null || user?.id == null || post.user.id !== user.id) {
        return (<></>);
    }

    const goBack = () => history.push(MainRoutes.forumThread(threadId));

    const getTitle = () => title != null
        ? `Modifica post in ${title}`
        : "Modifica post";

    return (<ForumPostForm title={getTitle()}
                           confirmButtonText="Modifica post"
                           goBack={goBack}
                           formik={formik} />)
};

export default ModifyPost;