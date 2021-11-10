// @flow

import React, {useState} from "react";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SendMessageToCharacter from "../_layout/button-links/SendMessageToCharacter";
import Stack from "@mui/material/Stack";
import ShowCharacterSheet from "../_layout/button-links/ShowCharacterSheet";
import ShowCharacterDashboard from "../_layout/button-links/ShowCharacterDashboard";
import List from "@mui/material/List";

type Props = {
    characters: Array<{|
        +id: string,
        +name: ?string
    |}>;
};

const ShowCharactersComponent = ({characters}: Props): any => {
    const [filteredCharacter, setFilteredCharacter] = useState(characters);

    const characterActions = characterId => (
        <Stack direction="row">
            <SendMessageToCharacter characterId={characterId} />
            <ShowCharacterSheet characterId={characterId} />
            <ShowCharacterDashboard characterId={characterId} />
        </Stack>
    )

    const characterLine = ({id, name}) => {
        return (
            <>
                <Divider />
                <ListItem key={id}
                          secondaryAction={characterActions(id)}>
                    <ListItemText primary={name} />
                </ListItem>
            </>
        );
    }

    const showCharacters = () =>
        filteredCharacter.map(characterLine);

    const filter = ({target: {value}}) => {
        setFilteredCharacter(_ => characters.filter(c => c.name?.indexOf(value) !== -1));
    }

    return (
        <Box sx={{
            margin: "0 auto",
            maxWidth: "550px",
            minWidth: "400px",
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
                    <List sx={{width: "100%"}}>
                        {showCharacters()}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ShowCharactersComponent;
