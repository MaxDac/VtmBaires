// @flow

import React from "react";
import ReactMarkdown from 'react-markdown'
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import type {ChatEntry} from "../../services/base-types";
import Box from "@mui/material/Box";
import {markdownComponents} from "../../_base/components/ParsedText";

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

    const commonStyle = {
        ...sx,
        fontFamily: 'GabrieleLightRibbon'
    }

    const masterPhraseStyle = {
        ...commonStyle,
        fontSize: sx?.fontSize ?? '18px',
        fontWeight: 'bold',
        textAlign: 'center'
    };

    const primaryText = () => {
        const text = isText()
            ? entry.character.name
            : `${entry.character.name} (dices)`;

        return (
            <Box component="div" sx={{
                ...commonStyle,
                color: "red"
            }}>
                {`${text} ${entry.insertedAt}`}
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

    const itemText = () =>
        isMaster()
            ? <ListItemText primary={secondaryText()} sx={{
                textAlign: "center"
            }} />
            : (
                <>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={entry.character.chatAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary={primaryText()} secondary={secondaryText()} />
                </>
            );

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
