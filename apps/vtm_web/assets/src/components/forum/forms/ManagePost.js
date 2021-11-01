// @flow

import React, {useContext} from "react";
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
import {MainRoutes} from "../../MainRouter";
import ForumPostForm from "./ForumPostForm";
import type {GetForumPostQuery} from "../../../services/queries/forum/__generated__/GetForumPostQuery.graphql";
import {getForumPostQuery} from "../../../services/queries/forum/GetForumPostQuery";
import ModifyPostMutation from "../../../services/mutations/forum/ModifyPostMutation";

const CreateNewPostValidationSchema = object().shape({
    text: string("Il testo dell'intervento").required("Richiesto")
});

type NewPostProps = {
    threadId: string;
    title: ?string;
}

const NewPost = ({threadId, title}: NewPostProps): any => {
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
}

type ModifyPostProps = {
    threadId: string;
    postId: string;
    title: ?string;
}

const ModifyPost = ({threadId, postId, title}: ModifyPostProps): any => {
    const history = useHistory();
    const [user,] = useSession();
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);
    const post = useCustomLazyLoadQuery<GetForumPostQuery>(getForumPostQuery, {
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
}

type Props = {
    threadId: string;
    postId?: string;
}

const ManagePost = ({threadId, postId}: Props): any => {
    const thread = useCustomLazyLoadQuery<GetForumThreadQuery>(getForumThreadQuery, {
        forumThreadId: threadId
    })?.getForumThread;

    console.log("thread", thread);

    if (thread?.id != null) {
        if (postId != null) {
            return (<ModifyPost threadId={thread.id} title={thread?.title} postId={postId} />);
        }
        else {
            return (<NewPost threadId={thread.id} title={thread?.title} />);
        }
    }
}

export default ManagePost;
