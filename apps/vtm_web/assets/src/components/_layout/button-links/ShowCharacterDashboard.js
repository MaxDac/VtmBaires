// @flow

import React from "react";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../../MainRouter";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from '@mui/icons-material/Dashboard';
import {menuIconStyle} from "../menu/menu-base-utils";
import {useSession} from "../../../services/session-service";
import {isUserMaster} from "../../../services/base-types";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import {iconButtonSize} from "./constants";

type Props = {
    characterId: ?string;
    onSelected?: () => void;
    asMenuItem?: boolean;
}

const ShowCharacterDashboard = ({characterId, onSelected, asMenuItem}: Props): any => {
    const [user,] = useSession();
    const history = useHistory();

    const tryVisualizeCharacterDashboard = characterId =>
        _ => {
            history.push(MainRoutes.characterDashboard(characterId));

            if (onSelected != null) {
                onSelected();
            }
        }

    if (isUserMaster(user) && characterId != null) {
        if (asMenuItem === true) {
            return (
                <MenuItem onClick={tryVisualizeCharacterDashboard(characterId)}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    Dashboard personaggio
                </MenuItem>
            );
        }

        return (
            <Tooltip title="Visualizza Dashboard personaggio">
                <IconButton aria-label="Messaggio"
                            size={iconButtonSize}
                            onClick={tryVisualizeCharacterDashboard(characterId)}>
                    <DashboardIcon sx={menuIconStyle} />
                </IconButton>
            </Tooltip>
        );
    }

    return (<></>);
};

export default ShowCharacterDashboard;
