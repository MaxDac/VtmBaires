// @flow

import React from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type Props = {
    onClick: () => void;
}

const CreateNewCharacterMenuItem = ({onClick}: Props): any => {
    return (
        <ListItem button onClick={onClick}>
            <ListItemIcon>
                <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Crea Personaggio" />
        </ListItem>
    );
}

export default CreateNewCharacterMenuItem;
