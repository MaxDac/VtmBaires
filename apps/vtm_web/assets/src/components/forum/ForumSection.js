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
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import {useSession} from "../../services/session-service";
import {MainRoutes} from "../MainRouter";
import Pagination from "@mui/material/Pagination";

type Props = {
    sectionId: string;
}

export const DefaultPageSize = 10;

const ForumSection = ({sectionId}: Props): any => {
    const history = useHistory();
    const [,character] = useSession();
    const [currentPage, setCurrentPage] = useState(1);

    const section = firstOrDefault(useForumSections()
        ?.getForumSections
        ?.filter(s => s?.id === sectionId));

    const response = useCustomLazyLoadQuery<GetForumThreadsQuery>(
        getForumThreadsQuery,
        {forumSectionId: sectionId, pageSize: DefaultPageSize, page: currentPage},
        {fetchPolicy: "store-and-network"}
    )?.getForumThreads;

    const pageCount = Math.ceil((response?.threadCount ?? 0) / DefaultPageSize);

    const toFormThread = id => history.push(MainRoutes.forumThread(id ?? ""));

    const showForumThreads = () => response?.threads
        ?.map(s => <ForumItemSelector item={s} onClick={toFormThread} />);

    const controls = () => {
        if (section?.onGame === false || character != null) {
            return (
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{padding: "20px"}}>
                            <Button fullWidth
                                    onClick={_ => history.push(MainRoutes.forumSections)}
                                    variant="contained"
                                    color="primary">
                                Torna al forum
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{padding: "20px"}}>
                            <Button fullWidth
                                    onClick={createNew}
                                    variant="contained"
                                    color="primary">
                                Crea nuovo thread
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        return <></>;
    };

    const onPageChanged = (newPage: number) => {
        setCurrentPage(_ => newPage);
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

    const createNew = _ => history.push(MainRoutes.createNewForumThread(sectionId));

    return (
        <ForumLayout title={section?.title ?? "Section"}>
            <Grid container>
                {controls()}
                <Grid item xs={12}>
                    {showForumThreads()}
                </Grid>
                {paginationControl()}
            </Grid>
        </ForumLayout>
    );
}

export default ForumSection;
