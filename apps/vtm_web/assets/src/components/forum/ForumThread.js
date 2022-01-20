// @flow

import React, {useEffect, useState} from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {getForumThreadQuery} from "../../services/queries/forum/GetForumThreadQuery";
import ForumLayout from "./layout/ForumLayout";
import type {GetForumThreadQuery} from "../../services/queries/forum/__generated__/GetForumThreadQuery.graphql";
import Grid from "@mui/material/Grid";
import {useSession} from "../../services/session-service";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../MainRouter";
import ForumThreadPage from "./ForumThreadPage";
import Pagination from '@mui/material/Pagination';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {menuIconStyle} from "../_layout/menu/menu-base-utils";
import {useRelayEnvironment} from "react-relay";
import SetForumThreadReadMutation from "../../services/mutations/forum/SetForumThreadReadMutation";
import type {GenericReactComponent} from "../../_base/types";

type Props = {
    threadId: string;
}

export const DefaultPageSize = 10;

const ForumThread = ({threadId}: Props): GenericReactComponent => {
    const environment = useRelayEnvironment();
    const history = useHistory();

    const thread = useCustomLazyLoadQuery<GetForumThreadQuery>(getForumThreadQuery, {
        forumThreadId: threadId
    }, {
        fetchPolicy: "store-and-network"
    })?.getForumThread;

    useEffect(() => {
        // Throw and forget
        SetForumThreadReadMutation(environment, threadId)
            .then(r => console.debug("Set Thread read successful", r))
            .catch(e => console.error(e));
    }, [environment, threadId]);

    const [,character] = useSession();
    const [currentPage, setCurrentPage] = useState(1);

    const pageCount = Math.ceil((thread?.postCount ?? 0) / DefaultPageSize);

    const showThreadPosts = () => (
        <ForumThreadPage threadId={threadId}
                         page={currentPage} />
    );

    const onPageChanged = (newPage: number) => {
        setCurrentPage(_ => newPage);
    }

    const goToForum = _ => history.push(MainRoutes.forumSections);

    const goToSection = _ => history.push(MainRoutes.forumSection(thread?.forumSection?.id ?? ""));

    const createNew = _ => history.push(MainRoutes.createNewForumPost(threadId));

    const forumControls = () => {
        const createNewPost = () => {
            if (thread?.onGame === false || character != null) {
                return (
                    <Tooltip title="Nuovo Post">
                        <IconButton aria-label="Nuovo Post"
                                    onClick={createNew}>
                            <ForumIcon sx={menuIconStyle} />
                        </IconButton>
                    </Tooltip>
                );
            }

            return (<></>);
        };


        return (
            <>
                <Tooltip title="Torna al Forum">
                    <IconButton aria-label="Forum"
                                onClick={goToForum}>
                        <HomeIcon sx={menuIconStyle} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Torna alla sezione">
                    <IconButton aria-label="Sezione"
                                onClick={goToSection}>
                        <ArrowBackIcon sx={menuIconStyle} />
                    </IconButton>
                </Tooltip>
                {createNewPost()}
            </>
        );
    }

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

    return (
        <ForumLayout title={thread?.title ?? "Thread"}
                     description={thread?.description}
                     controls={forumControls()}>
            <Grid container>
                {showThreadPosts()}
                {paginationControl()}
            </Grid>
        </ForumLayout>
    );
}

export default ForumThread;
