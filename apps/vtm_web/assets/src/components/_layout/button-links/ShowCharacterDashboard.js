// @flow

import React from "react";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../../MainRouter";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from '@mui/icons-material/Dashboard';
import {menuIconStyle} from "../Menu";
import {useSession} from "../../../services/session-service";
import {isUserMaster} from "../../../services/base-types";

type Props = {
    characterId: ?string;
    onSelected?: () => void;
}

const ShowCharacterDashboard = ({characterId, onSelected}: Props): any => {
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
        return (
            <Tooltip title="Visualizza Dashboard personaggio">
                <IconButton edge="end"
                            aria-label="Messaggio"
                            size="large"
                            onClick={tryVisualizeCharacterDashboard(characterId)}>
                    <DashboardIcon sx={menuIconStyle} />
                </IconButton>
            </Tooltip>
        );
    }

    return (<></>);
};

export default ShowCharacterDashboard;
