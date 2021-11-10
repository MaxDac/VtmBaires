// @flow

import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import {menuIconStyle} from "../Menu";
import {MainRoutes} from "../../MainRouter";
import {useHistory} from "react-router-dom";

type Props = {
    characterId: ?string;
    onSelected?: () => void;
}

const ShowCharacterSheet = ({characterId, onSelected}: Props): any => {
    const history = useHistory();

    const tryVisualizeCharacterSheet = characterId =>
        _ => {
            history.push(MainRoutes.sheet(characterId));

            if (onSelected != null) {
                onSelected();
            }
        }

    if (characterId != null) {
        return (
            <Tooltip title="Visualizza scheda">
                <IconButton aria-label="Messaggio"
                            size="large"
                            onClick={tryVisualizeCharacterSheet(characterId)}>
                    <ContactPageIcon sx={menuIconStyle} />
                </IconButton>
            </Tooltip>
        );
    }

    return (<></>);
};

export default ShowCharacterSheet;
