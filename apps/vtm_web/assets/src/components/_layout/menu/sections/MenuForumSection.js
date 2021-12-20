// @flow

import React from "react";
import ListItem from "@mui/material/ListItem";
import {MainRoutes} from "../../../MainRouter";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChatIcon from "@mui/icons-material/Chat";
import {menuIconStyle, MenuSecondaryText} from "../menu-base-utils";
import ListItemText from "@mui/material/ListItemText";
import {useForumHasNewPosts} from "../../../../services/queries/forum/ForumHasNewPostQuery";

type Props = {
    pushHistory: string => void;
}

const MenuForumSection = ({pushHistory}: Props): any => {
    const forumHasNewPosts = useForumHasNewPosts();

    const forumIconStyle =
        forumHasNewPosts
            ? {
                ...menuIconStyle,
                color: "#C31313"
            }
            : menuIconStyle;

    return (
        <ListItem button onClick={_ => pushHistory(MainRoutes.forumSections)}>
            <ListItemIcon>
                <ChatIcon sx={forumIconStyle} />
            </ListItemIcon>
            <ListItemText secondary={<MenuSecondaryText text="Forum" />} />
        </ListItem>
    );
}

export default MenuForumSection;
