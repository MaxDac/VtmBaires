// @flow

import React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ForumIcon from "@mui/icons-material/Forum";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../../MainRouter";
import Tooltip from '@mui/material/Tooltip';
import {menuIconStyle} from "../menu/menu-base-utils";

type Props = {
    numberOfMessages: number;
}

const MessageControl = ({numberOfMessages}: Props): any => {
    const history = useHistory();

    return (
        <Tooltip title="Messaggi" placement="bottom">
            <IconButton aria-label="messages" onClick={_ => history.push(MainRoutes.messages)}>
                <Badge badgeContent={numberOfMessages} color="secondary">
                    <ForumIcon sx={menuIconStyle} />
                </Badge>
            </IconButton>
        </Tooltip>
    );
}

export default MessageControl;
