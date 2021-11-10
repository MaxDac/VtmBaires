// @flow

import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MessageIcon from "@mui/icons-material/Message";
import {menuIconStyle} from "../Menu";
import {MainRoutes} from "../../MainRouter";
import {useHistory} from "react-router-dom";

type Props = {
    userId: ?string;
    onSelected?: () => void;
}

const SendMessageToUser = ({userId, onSelected}: Props): any => {
    const history = useHistory();

    const trySendMessageToUser = _ => {
        if (userId != null) {
            history.push(MainRoutes.newMessageTo(userId));
        }
        else {
            history.push(MainRoutes.newMessage());
        }

        if (onSelected != null) {
            onSelected();
        }
    };

    return (
        <Tooltip title="Invia messaggio all'utente">
            <IconButton aria-label="Messaggio"
                        size="large"
                        onClick={trySendMessageToUser}>
                <MessageIcon sx={menuIconStyle} />
            </IconButton>
        </Tooltip>
    );
}

export default SendMessageToUser;
