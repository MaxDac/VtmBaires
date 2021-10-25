// @flow

import React, {useState} from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {getForumThreadQuery} from "../../services/queries/forum/GetForumThreadQuery";
import ForumLayout from "./layout/ForumLayout";
import type {GetForumThreadQuery} from "../../services/queries/forum/__generated__/GetForumThreadQuery.graphql";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useSession} from "../../services/session-service";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../MainRouter";
import ForumThreadPage from "./ForumThreadPage";
import Pagination from '@mui/material/Pagination';

type Props = {
    threadId: string;
}

export const DefaultPageSize = 10;

const ForumThread = ({threadId}: Props): any => {
    const history = useHistory();

    const thread = useCustomLazyLoadQuery<GetForumThreadQuery>(getForumThreadQuery, {
        forumThreadId: threadId
    }, {
        fetchPolicy: "store-or-network"
    })?.getForumThread;

    const [,character] = useSession();
    const [currentPage, setCurrentPage] = useState(1);

    const pageCount = Math.ceil((thread?.postCount ?? 0) / DefaultPageSize);

    const showThreadPosts = () => (
        <ForumThreadPage threadId={threadId} page={currentPage} />
    );

    const onPageChanged = (newPage: number) => {
        setCurrentPage(_ => newPage);
    }

    const topControls = () => {
        if (thread?.onGame === false || character != null) {
            return (
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12} sm={4} sx={{padding: "20px"}}>
                            <Button fullWidth
                                    onClick={_ => history.push(MainRoutes.forumSections)}
                                    variant="contained"
                                    color="primary">
                                Torna al Forum
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{padding: "20px"}}>
                            <Button fullWidth
                                    onClick={_ => history.push(MainRoutes.forumSection(thread?.forumSection?.id ?? ""))}
                                    variant="contained"
                                    color="primary">
                                Torna alla sezione
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{padding: "20px"}}>
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
    };

    const paginationControl = () => {
        if (pageCount > 1) {
            return (
                <Grid item xs={12} sx={{
                    textAlign: "right",
                    padding: "20px"
                }}>
                    <Pagination count={pageCount}
                                defaultPage={1}
                                siblingCount={0}
                                onChange={(_, newPage) => onPageChanged(newPage)} />
                </Grid>
            )
        }

        return (<></>);
    };

    const createNew = _ => history.push(MainRoutes.createNewForumPost(threadId));

    return (
        <ForumLayout title={thread?.title ?? "Thread"}>
            {topControls()}
            <Grid container>
                {showThreadPosts()}
                {paginationControl()}
            </Grid>
        </ForumLayout>
    );
}

export default ForumThread;
