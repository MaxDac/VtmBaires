// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@mui/material/ListItemText";

const forumSectionDescription = section => (
    <Typography component="span" sx={{
        display: "inline",
        fontFamily: 'GabrieleLightRibbon',
        padding: "5px",
        color: "white"
    }} variant="body2">
        {section?.description}
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
);

export default ForumListItem;
