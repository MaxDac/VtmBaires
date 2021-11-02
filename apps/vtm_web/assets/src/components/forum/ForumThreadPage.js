// @flow

import React, {useState} from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {DefaultPageSize} from "./ForumThread";
import ForumPostLayout from "./layout/ForumPostLayout";
import ForumPostWithAvatar from "./layout/ForumPostWithAvatar";
import type {GetForumThreadPostsQuery} from "../../services/queries/forum/__generated__/GetForumThreadPostsQuery.graphql";
import {getForumThreadPostsQuery} from "../../services/queries/forum/GetForumThreadPostsQuery";

type Props = {
    threadId: string;
    page: number;
}

const ForumThreadPage = ({threadId, page}: Props): any => {
    const [postFetchKey, setPostFetchKey] = useState(0);

    const onReloadCustom = () => {
        setPostFetchKey(p => p + 1);
    }

    const posts = useCustomLazyLoadQuery<GetForumThreadPostsQuery>(getForumThreadPostsQuery, {
        forumThreadId: threadId,
        pageSize: DefaultPageSize,
        page: page
    }, {
        fetchPolicy: "store-and-network",
        fetchKey: postFetchKey
    })?.getForumThreadPosts;

    const showThreadPost = post => (
        <ForumPostLayout key={post?.id} post={post} threadId={threadId} onReload={onReloadCustom}>
            <ForumPostWithAvatar post={post} onGame={post?.onGame === true} />
        </ForumPostLayout>
    );

    const showThreadPosts = () =>
        posts?.map(showThreadPost);

    return showThreadPosts();
}

export default ForumThreadPage;
