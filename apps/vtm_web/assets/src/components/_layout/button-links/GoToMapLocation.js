// @flow

import React, {useContext} from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RoomIcon from "@mui/icons-material/Room";
import {menuIconStyle} from "../Menu";
import {useHistory} from "react-router-dom";
import {goToChatAndUpdateSession} from "../../chat/chat-helpers";
import {SessionContext} from "../../../contexts";

type Props = {
    location: ?{
        id: string;
        name?: ?string;
    };
    onSelected?: () => void;
}

const GoToMapLocation = ({location, onSelected}: Props): any => {
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
        return (
            <Tooltip title="Vai alla chat">
                <IconButton edge="end"
                            aria-label="Chat"
                            size="large"
                            onClick={tryGoToLocation(location)}>
                    <RoomIcon sx={menuIconStyle}/>
                </IconButton>
            </Tooltip>
        );
    }

    return (<></>);
}

export default GoToMapLocation;
