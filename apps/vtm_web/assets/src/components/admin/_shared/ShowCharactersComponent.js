// @flow

import React from "react";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

type Props = {
    characters: Array<{
        id: string,
        name: string
    }>;
    onCharacterSelected: string => void;
}

const ShowCharactersComponent = ({characters, onCharacterSelected}: Props): any => {
    const selectCharacter = id => onCharacterSelected(id);

    const characterLine = ({id, name}) => {
        return (
            <>
                <Divider />
                <ListItem button disablePadding onClick={_ => selectCharacter(id)}>
                    <ListItemButton>
                        <ListItemText primary={name} sx={{textAlign: "center"}} />
                    </ListItemButton>
                </ListItem>
            </>
        );
    }

    const showCharacters = () =>
        characters.map(characterLine);

    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'background.paper'
        }}>
            {showCharacters()}
        </Box>
    );
}

export default ShowCharactersComponent;
