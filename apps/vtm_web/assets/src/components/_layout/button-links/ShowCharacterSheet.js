// @flow

import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import {menuIconStyle} from "../menu/Menu";
import {MainRoutes} from "../../MainRouter";
import {useHistory} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import {iconButtonSize} from "./constants";

type Props = {
    characterId: ?string;
    onSelected?: () => void;
    asMenuItem?: boolean;
}

const ShowCharacterSheet = ({characterId, onSelected, asMenuItem}: Props): any => {
    const history = useHistory();

    const tryVisualizeCharacterSheet = characterId =>
        _ => {
            history.push(MainRoutes.sheet(characterId));

            if (onSelected != null) {
                onSelected();
            }
        }

    if (characterId != null) {
        if (asMenuItem === true) {
            return (
                <MenuItem onClick={tryVisualizeCharacterSheet(characterId)}>
                    <ListItemIcon>
                        <ContactPageIcon />
                    </ListItemIcon>
                    Mostra scheda
                </MenuItem>
            );
        }

        return (
            <Tooltip title="Visualizza scheda">
                <IconButton aria-label="Messaggio"
                            size={iconButtonSize}
                            onClick={tryVisualizeCharacterSheet(characterId)}>
                    <ContactPageIcon sx={menuIconStyle} />
                </IconButton>
            </Tooltip>
        );
    }

    return (<></>);
};

export default ShowCharacterSheet;
