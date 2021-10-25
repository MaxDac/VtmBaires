// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {defaultFormatDateAndTime} from "../../../_base/utils";

const forumSectionDescription = section => (
    <Typography component="span" sx={{
        display: "inline",
        fontFamily: 'GabrieleLightRibbon',
        padding: "5px",
        color: "white"
    }} variant="body2">
        {defaultFormatDateAndTime(section?.insertedAt)}

        <span style={{
            color: "grey"
        }}>
            &nbsp;-&nbsp;{section?.description}
        </span>
    </Typography>
);

export type ForumItemProps = {
    item: ?{
        +id: string;
        +title: ?string;
        +description: ?string;
    };
    onClick: ?string => void;
}

const ForumListItem = ({item, onClick}: ForumItemProps): any => (
    <>
        <Divider />
        <ListItem key={item?.id} alignItems="flex-start" button onClick={_ => onClick(item?.id)}>
            <ListItemText primary={item?.title}
                          secondary={forumSectionDescription(item)}
                          sx={{
                              color: "white",
                              fontFamily: 'GabrieleLightRibbon',
                              fontSize: "24px",
                              padding: "5px"
                          }} />
        </ListItem>
        <Divider />
    </>
);

export default ForumListItem;
