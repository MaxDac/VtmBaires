// @flow

import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RoomIcon from "@mui/icons-material/Room";
import {menuIconStyle} from "../Menu";
import {MainRoutes} from "../../MainRouter";
import {useHistory} from "react-router-dom";

type Props = {
    locationId: ?string;
    onSelected?: () => void;
}

const GoToMapLocation = ({locationId, onSelected}: Props): any => {
    const history = useHistory();

    const tryGoToLocation = id =>
        _ => {
            if (id != null) {
                history.push(MainRoutes.chat(id));
            }

            if (onSelected != null) {
                onSelected();
            }
        };

    if (locationId != null) {
        return (
            <Tooltip title="Vai alla chat">
                <IconButton edge="end"
                            aria-label="Chat"
                            size="large"
                            onClick={tryGoToLocation(locationId)}>
                    <RoomIcon sx={menuIconStyle}/>
                </IconButton>
            </Tooltip>
        );
    }

    return (<></>);
}

export default GoToMapLocation;
