// @flow

import React from "react";
import useForumSections from "../../services/queries/forum/GetForumSectionsQuery";
import List from "@mui/material/List";
import ForumLayout from "./layout/ForumLayout";
import ForumItemSelector from "./layout/ForumListItem";
import {useHistory} from "react-router-dom";
import {Routes} from "../../AppRouter";

const ForumSections = (): any => {
    const history = useHistory();
    const forumSections = useForumSections()?.getForumSections;

    const toSection = sectionId => {
        if (sectionId != null) {
            history.push(Routes.forumSection(sectionId));
        }
    }

    const showForumSections = () => forumSections
        ?.map(s => <ForumItemSelector key={s?.id} item={s} onClick={toSection} />);

    return (
        <ForumLayout title="Forum">
            <List sx={{width: "100%", color: "background.paper"}}>
                {showForumSections()}
            </List>
        </ForumLayout>
    );
}

export default ForumSections;
