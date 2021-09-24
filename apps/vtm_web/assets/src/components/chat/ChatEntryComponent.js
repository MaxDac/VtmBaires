// @flow

import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import type {ChatEntry} from "../../services/base-types";
import Box from "@mui/material/Box";

type ChatEntryComponentProps = {
    entry: ChatEntry;
    isLast?: ?boolean;
}

const ChatEntryComponent = ({entry, isLast}: ChatEntryComponentProps): any => {
    const divider = () => <Divider variant="inset" component="li" />

    const isText = () => Boolean(entry.text);

    const isMaster = () => entry.master;

    const parseResult = () => entry.result
        // Until Flow includes replaceAll
        // $FlowFixMe
        .replaceAll("[red]", `<span style="color: red;">`)
        .replaceAll("[/red]", `</span>`);

    const masterPhraseStyle = {
        fontFamily: 'GabrieleLightRibbon',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center'
    };

    const primaryText = () => {
        const text = isText()
            ? entry.characterName
            : `${entry.characterName} (dices)`;

        return (
            <Box component="div" sx={{
                fontFamily: 'GabrieleLightRibbon',
                color: "red"
            }}>
                {`${text} ${entry.insertedAt}`}
            </Box>
        );
    }

    const parseChatEntryText = () =>
        <Typography sx={{
            fontFamily: 'GabrieleLightRibbon'
        }}>
            {entry.text}
        </Typography>;

    const parseChatEntryResult = () =>
        <Typography sx={{
            fontFamily: 'GabrieleLightRibbon'
        }} dangerouslySetInnerHTML={{__html: parseResult()}}>
        </Typography>;

    const parseChatEntryMasterText = () =>
        <Typography sx={masterPhraseStyle}>
            {entry.text}
        </Typography>;

    const parseChatEntryMasterResult = () =>
        <Typography sx={masterPhraseStyle} dangerouslySetInnerHTML={{__html: parseResult()}}>
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
                        <Avatar alt="Remy Sharp" src={entry.characterChatAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary={primaryText()} secondary={secondaryText()} />
                </>
            );

    return (
        <>
            <ListItem alignItems="flex-start">
                {itemText()}
            </ListItem>
            {isLast ? <></> : divider()}
        </>
    );
}

export default ChatEntryComponent;
