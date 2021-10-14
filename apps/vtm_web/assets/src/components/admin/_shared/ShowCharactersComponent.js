// @flow

import React, {useState} from "react";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

type Props = {
    characters: Array<{
        id: string,
        name: string
    }>;
    onCharacterSelected: string => void;
}

const ShowCharactersComponent = ({characters, onCharacterSelected}: Props): any => {
    const [filteredCharacter, setFilteredCharacter] = useState(characters);

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
        filteredCharacter.map(characterLine);

    const filter = ({target: {value}}) => {
        setFilteredCharacter(_ => characters.filter(c => c.name.indexOf(value) !== -1));
    }

    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'background.paper'
        }}>
            <Grid container>
                <Grid item xs={12} sx={{
                    textAlign: "center",
                    padding: "20px"
                }}>
                    <TextField onKeyUp={filter}
                               variant="outlined"
                               label="Filtra" />
                </Grid>
                <Grid item xs={12}>
                    {/*<FixedSizeList height="100vh"*/}
                    {/*               width="100%"*/}
                    {/*               itemSize={20}*/}
                    {/*               itemCount={characters.length}*/}
                    {/*               overscanCount={5}>*/}
                        {showCharacters()}
                    {/*</FixedSizeList>*/}
                </Grid>
            </Grid>
        </Box>
    );
}

export default ShowCharactersComponent;
