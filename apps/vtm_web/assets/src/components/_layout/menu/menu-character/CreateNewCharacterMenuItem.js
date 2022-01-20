// @flow

import React from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {menuIconStyle, MenuSecondaryText} from "../menu-base-utils";
import type {GenericReactComponent} from "../../../../_base/types";

type Props = {
    onClick: () => void;
}

const CreateNewCharacterMenuItem = ({onClick}: Props): GenericReactComponent => {
    return (
        <ListItem button onClick={onClick}>
            <ListItemIcon>
                <PersonAddIcon sx={menuIconStyle} />
            </ListItemIcon>
            <ListItemText secondary={<MenuSecondaryText text="Crea Personaggio" />} />
        </ListItem>
    );
}

export default CreateNewCharacterMenuItem;
