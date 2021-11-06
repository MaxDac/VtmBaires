// @flow

import React from "react";
import ReactMarkdown from 'react-markdown';
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import type {ChatEntry} from "../../services/base-types";
import Box from "@mui/material/Box";
import {markdownComponents} from "../../_base/components/ParsedText";
import {defaultFormatTime} from "../../_base/date-utils";

type ChatEntryComponentProps = {
    entry: ChatEntry;
    isLast?: ?boolean;
    showCharacterDescription: (string, string) => void;
    sx?: any;
}

const ChatEntryComponent = ({entry, isLast, showCharacterDescription, sx}: ChatEntryComponentProps): any => {
    const divider = () => <Divider variant="inset" component="li" />

    const isText = () => Boolean(entry.text);

    const isMaster = () => entry.master;

    const isOffGame = () => entry?.offGame === true;

    const commonStyle = {
        color: "primary.light",
        ...sx,
        fontFamily: 'Chat'
    }

    const masterPhraseStyle = {
        ...commonStyle,
        fontSize: sx?.fontSize ?? '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: "primary.light"
    };

    const avatarStyle = {
        width: "3rem",
        height: "3rem"
    }

    const primaryText = () => {
        const text = isText()
            ? entry.character.name
            : `${entry.character.name} (tiro di dadi)`;

        return (
            <Box component="div" sx={{
                ...commonStyle,
                color: "secondary.light",
                textShadow: "2px 2px 5px black"
            }}>
                {`${text} ${defaultFormatTime(entry?.insertedAt) ?? ""}`}
            </Box>
        );
    }

    const parseChatEntryText = () =>
        <Typography component="div" sx={{
            ...commonStyle,
        }}>
            <ReactMarkdown components={markdownComponents} className="no-padding-paragraph">
                {entry.text}
            </ReactMarkdown>
        </Typography>;

    const parseChatEntryResult = () =>
        <Typography component="div" sx={{
            ...commonStyle,
        }}>
            <ReactMarkdown components={markdownComponents} className="no-padding-paragraph">
                {entry.result}
            </ReactMarkdown>
        </Typography>;

    const parseChatEntryMasterText = () =>
        <Typography component="div" sx={masterPhraseStyle}>
            <ReactMarkdown components={markdownComponents} className="no-padding-paragraph">
                {entry.text}
            </ReactMarkdown>
        </Typography>;

    const parseChatEntryMasterResult = () =>
        <Typography component="div" sx={masterPhraseStyle}>
            <ReactMarkdown components={markdownComponents} className="no-padding-paragraph">
                {entry.result}
            </ReactMarkdown>
        </Typography>;

    const secondaryText = () =>
        isMaster()
            ? isText() ? parseChatEntryMasterText() : parseChatEntryMasterResult()
            : isText() ? parseChatEntryText() : parseChatEntryResult();

    const secondaryOffText = () => (
        <Typography paragraph sx={{
            fontSize: "13px",
            lineHeight: 1,
            marginBottom: "3px",
            color: "primary.dark"
        }}>
            <b><i>{entry?.character?.name}</i></b>: {entry?.text}
        </Typography>
    );

    const getMasterEntry = () => (
        <ListItemText primary={secondaryText()} sx={{
            textAlign: "center"
        }} />
    );

    const getChatEntry = () => (
        <>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp"
                        src={entry.character.chatAvatar}
                        sx={avatarStyle} />
            </ListItemAvatar>
            <ListItemText primary={primaryText()} secondary={secondaryText()} />
        </>
    );

    const getOffGameEntry = () => (
        <>
            <ListItemText secondary={secondaryOffText()} />
        </>
    );

    const itemText = () => {
        if (isOffGame()) {
            return getOffGameEntry();
        }

        if (isMaster()) {
            return getMasterEntry();
        }

        return getChatEntry();
    }

    const showDescription = _ => {
        if (!isMaster()) {
            showCharacterDescription(entry?.character?.id, entry?.character?.name);
        }
    };

    return (
        <>
            <ListItem alignItems="flex-start" button onClick={showDescription}>
                {itemText()}
            </ListItem>
            {isLast ? <></> : divider()}
        </>
    );
}

export default ChatEntryComponent;
