// @flow

import React, {useContext} from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RoomIcon from "@mui/icons-material/Room";
import {menuIconStyle} from "../menu/menu-base-utils";
import {useHistory} from "react-router-dom";
import {goToChatAndUpdateSession} from "../../chat/chat-helpers";
import {SessionContext} from "../../../contexts";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import {iconButtonSize} from "./constants";
import type {GenericReactComponent} from "../../../_base/types";

type Props = {
    location: ?{
        +id: string;
        +name?: ?string;
    };
    onSelected?: () => void;
    asMenuItem?: boolean;
}

const GoToMapLocation = ({location, onSelected, asMenuItem}: Props): GenericReactComponent => {
    const sessionUtils = useContext(SessionContext);
    const history = useHistory();

    const tryGoToLocation = location =>
        _ => {
            if (location?.id != null) {
                goToChatAndUpdateSession(sessionUtils, history, location.id, location?.name);
            }

            if (onSelected != null) {
                onSelected();
            }
        };

    if (location?.id != null) {
        if (asMenuItem === true) {
            return (
                <MenuItem onClick={tryGoToLocation(location)}>
                    <ListItemIcon>
                        <RoomIcon />
                    </ListItemIcon>
                    Vai alla chat
                </MenuItem>
            );
        }

        return (
            <Tooltip title="Vai alla chat">
                <IconButton edge="end"
                            aria-label="Chat"
                            size={iconButtonSize}
                            onClick={tryGoToLocation(location)}>
                    <RoomIcon sx={menuIconStyle}/>
                </IconButton>
            </Tooltip>
        );
    }

    return (<></>);
}

export default GoToMapLocation;
