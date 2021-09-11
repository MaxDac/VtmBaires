// @flow

import React from "react";

import type { ChatEntry } from "../../services/queries/chat/ChatQueries";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

type ChatEntryComponentProps = {
    classes: any;
    entry: ChatEntry;
    isLast?: ?boolean;
}

const ChatEntryComponent = ({classes, entry, isLast}: ChatEntryComponentProps): any => {
    const divider = () => <Divider variant="inset" component="li" />

    const primaryText = () =>
        <div className={classes.chatShowName}>
            {entry.characterName}
        </div>;

    const secondaryText = () =>
        <Typography className={classes.chatShowText}>
            {entry.text || entry.result}
        </Typography>;

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={entry.characterChatAvatar} />
                </ListItemAvatar>
                <ListItemText primary={primaryText()} secondary={secondaryText()} />
            </ListItem>
            {isLast ? <></> : divider()}
        </>);
}

export default ChatEntryComponent;
