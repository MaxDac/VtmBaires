// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {getForumThreadQuery} from "../../../services/queries/forum/GetForumThreadQuery";
import {object, string} from "yup";
import type {GenericReactComponent} from "../../../_base/types";
import ModifyPost from "./posts/ModifyPost";
import NewPost from "./posts/NewPost";

export const CreateNewPostValidationSchema: any = object().shape({
    text: string("Il testo dell'intervento").required("Richiesto")
});

type Props = {
    threadId: string;
    postId?: string;
}

const ManagePost = ({threadId, postId}: Props): GenericReactComponent => {
    const thread = useCustomLazyLoadQuery(getForumThreadQuery, {
        forumThreadId: threadId
    })?.getForumThread;

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
