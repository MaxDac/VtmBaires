// @flow

import React from "react";
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
import { MainRoutes } from "../MainRouter";

type Props = {
    sectionId: string;
}

const ForumSection = ({sectionId}: Props): any => {
    const history = useHistory();
    const [,character] = useSession();

    const section = firstOrDefault(useForumSections()
        ?.getForumSections
        ?.filter(s => s?.id === sectionId));

    const threads = useCustomLazyLoadQuery<GetForumThreadsQuery>(
        getForumThreadsQuery,
        {forumSectionId: sectionId},
        {fetchPolicy: "store-and-network"}
    )?.getForumThreads;

    const toFormThread = id => history.push(MainRoutes.forumThread(id ?? ""));

    const showForumThreads = () => threads
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
    }

    const createNew = _ => history.push(MainRoutes.createNewForumThread(sectionId));

    return (
        <ForumLayout title={section?.title ?? "Section"}>
            <Grid container>
                {controls()}
                <Grid item xs={12}>
                    {showForumThreads()}
                </Grid>
            </Grid>
        </ForumLayout>
    );
}

export default ForumSection;
