// @flow

import React from "react";
import Grid from "@material-ui/core/Grid";

import type { ChatEntry } from "../../services/queries/chat/ChatQueries";
import Avatar from "@material-ui/core/Avatar";

const ChatEntryComponent = (classes: any, entry: ChatEntry): any => {
    return (
        <table width="100%" style={{padding: "10px"}}>
            <tr>
                <td width="50px">
                    <Avatar alt="Remy Sharp" src={entry.characterChatAvatar} />
                </td>
                <td width="100px" className={classes.chatShowName}>
                    {entry.characterName}
                </td>
                <td className={classes.chatShowText}>
                    {entry.text || entry.result}
                </td>
            </tr>
        </table>
    );
}

export default ChatEntryComponent;
