// @flow

import React, {useState} from "react";
import ForumLayout from "./layout/ForumLayout";
import useForumSections from "../../services/queries/forum/GetForumSectionsQuery";
import {firstOrDefault} from "../../_base/utils";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {getForumThreadsQuery} from "../../services/queries/forum/GetForumThreadsQuery";
import ForumItemSelector from "./layout/ForumListItem";
import type {GetForumThreadsQuery} from "../../services/queries/forum/__generated__/GetForumThreadsQuery.graphql";
import Grid from "@mui/material/Grid";
import {useHistory} from "react-router-dom";
import {useSession} from "../../services/session-service";
import {MainRoutes} from "../MainRouter";
import Pagination from "@mui/material/Pagination";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from '@mui/icons-material/Home';
import {menuIconStyle} from "../_layout/menu/menu-base-utils";

type Props = {
    sectionId: string;
}

export const DefaultPageSize = 10;

const ForumSection = ({sectionId}: Props): any => {
    const history = useHistory();
    const [,character] = useSession();
    const [currentPage, setCurrentPage] = useState(1);
    const [threadFetchKey, setThreadFetchKey] = useState(0);

    const section = firstOrDefault(useForumSections()
        ?.getForumSections
        ?.filter(s => s?.section?.id === sectionId));

    const response = useCustomLazyLoadQuery<GetForumThreadsQuery>(
        getForumThreadsQuery,
        {
            forumSectionId: sectionId,
            pageSize: DefaultPageSize,
            page: currentPage
        },
        {
            fetchPolicy: "store-and-network",
            fetchKey: threadFetchKey
        }
    )?.getForumThreads;

    const onUpdate = () => setThreadFetchKey(p => p + 1);

    const pageCount = Math.ceil((response?.threadCount ?? 0) / DefaultPageSize);

    const toFormThread = id => history.push(MainRoutes.forumThread(id ?? ""));

    const showForumThreads = () => response?.threads
        ?.map(s => <ForumItemSelector key={s?.thread?.id}
                                      item={s?.thread}
                                      hasNewPosts={s?.hasNewPosts}
                                      internal={true}
                                      onClick={toFormThread}
                                      onUpdate={onUpdate} />);

    const onPageChanged = (newPage: number) => {
        setCurrentPage(_ => newPage);
    };

    const goToForum = _ => history.push(MainRoutes.forumSections);

    const createNew = _ => history.push(MainRoutes.createNewForumThread(sectionId));

    const forumControls = () => {
        const createNewThreadControl = () => {
            if (section?.section?.onGame === false || character != null) {
                return (
                    <Tooltip title="Crea nuovo thread">
                        <IconButton aria-label="Messaggio"
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
                    <IconButton aria-label="Messaggio"
                                onClick={goToForum}>
                        <HomeIcon sx={menuIconStyle} />
                    </IconButton>
                </Tooltip>
                {createNewThreadControl()}
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
        <ForumLayout title={section?.section?.title ?? "Section"} controls={forumControls()}>
            <Grid container>
                <Grid item xs={12}>
                    {showForumThreads()}
                </Grid>
                {paginationControl()}
            </Grid>
        </ForumLayout>
    );
}

export default ForumSection;
