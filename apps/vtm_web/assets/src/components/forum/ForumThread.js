// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {getForumThreadQuery} from "../../services/queries/forum/GetForumThreadQuery";
import ForumLayout from "./layout/ForumLayout";
import type {GetForumThreadQuery} from "../../services/queries/forum/__generated__/GetForumThreadQuery.graphql";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Routes} from "../../AppRouter";
import useForumSections from "../../services/queries/forum/GetForumSectionsQuery";
import {firstOrDefault} from "../../_base/utils";
import {useSession} from "../../services/session-service";
import {useHistory} from "react-router-dom";
import ForumPostWithAvatar from "./layout/ForumPostWithAvatar";
import ForumPost from "./layout/ForumPost";
import ForumPostLayout from "./layout/ForumPostLayout";

type Props = {
    threadId: string;
}

const ForumThread = ({threadId}: Props): any => {
    const history = useHistory();

    const thread = useCustomLazyLoadQuery<GetForumThreadQuery>(getForumThreadQuery, {forumThreadId: threadId})
        ?.getForumThread;
    
    const section = firstOrDefault(useForumSections()
        ?.getForumSections
        ?.filter(s => s?.id != null && s.id === thread?.thread?.forumSection?.id));

    const [,character] = useSession();

    const showThreadPost = post => (
        <ForumPostLayout key={post?.id} post={post}>
            {
                post?.creatorAvatar != null
                    ? <ForumPostWithAvatar post={post} onGame={section?.onGame === true} />
                    : <ForumPost post={post} onGame={section?.onGame === true} />
            }
        </ForumPostLayout>
    );

    const showThreadPosts = () =>
        thread?.posts?.map(showThreadPost);

    const controls = () => {
        if (section?.onGame === false || character != null) {
            return (
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{padding: "20px"}}>
                            <Button fullWidth
                                    onClick={_ => history.push(Routes.forumSection(thread?.thread?.forumSection?.id ?? ""))}
                                    variant="contained"
                                    color="primary">
                                Torna alla sezione
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{padding: "20px"}}>
                            <Button fullWidth
                                    onClick={createNew}
                                    variant="contained"
                                    color="primary">
                                Crea nuovo post
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        return <></>;
    }

    const createNew = _ => history.push(Routes.createNewForumPost(threadId));

    return (
        <ForumLayout title={thread?.thread?.title ?? "Thread"}>
            {controls()}
            <Grid container>
                {showThreadPosts()}
            </Grid>
        </ForumLayout>
    );
}

export default ForumThread;
