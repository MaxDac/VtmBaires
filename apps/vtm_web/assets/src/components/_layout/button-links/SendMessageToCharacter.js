// @flow

import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EmailIcon from '@mui/icons-material/Email';
import {menuIconStyle} from "../Menu";
import {MainRoutes} from "../../MainRouter";
import {useHistory} from "react-router-dom";

type Props = {
    characterId: ?string;
    onSelected?: () => void;
}

const SendMessageToCharacter = ({characterId, onSelected}: Props): any => {
    const history = useHistory();

    const trySendMessageToCharacter = _ => {
        if (characterId != null) {
            history.push(MainRoutes.newMessageToCharacter(characterId));
        }
        else {
            history.push(MainRoutes.newMessage());
        }

        if (onSelected != null) {
            onSelected();
        }
    };

    return (
        <Tooltip title="Invia messaggio al personaggio">
            <IconButton aria-label="Messaggio"
                        size="large"
                        onClick={trySendMessageToCharacter}>
                <EmailIcon sx={menuIconStyle} />
            </IconButton>
        </Tooltip>
    );
}

export default SendMessageToCharacter;
