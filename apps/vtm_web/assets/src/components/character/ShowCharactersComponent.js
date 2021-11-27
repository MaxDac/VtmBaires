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
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import MenuLayout from "../../_base/components/MenuLayout";

type Props = {
    characters: Array<{|
        +id: string,
        +name: ?string
    |}>;
};

const CharacterActions = ({characterId}) => {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    if (isSmallScreen) {
        return (
            <MenuLayout>
                { onItemSelected =>
                    <>
                        <ShowCharacterSheet characterId={characterId}
                                            onSelected={onItemSelected}
                                            asMenuItem />
                        <SendMessageToCharacter characterId={characterId}
                                                onSelected={onItemSelected}
                                                asMenuItem />
                        <ShowCharacterDashboard characterId={characterId}
                                                onSelected={onItemSelected}
                                                asMenuItem />
                    </>
                }
            </MenuLayout>
        );
    }

    return (
        <Stack direction="row" spacing={false}>
            <SendMessageToCharacter characterId={characterId} />
            <ShowCharacterSheet characterId={characterId} />
            <ShowCharacterDashboard characterId={characterId} />
        </Stack>
    );
}

const ShowCharactersComponent = ({characters}: Props): any => {
    const [filteredCharacter, setFilteredCharacter] = useState(characters);

    const characterLine = ({id, name}) => {
        return (
            <>
                <Divider />
                <ListItem key={id}
                          secondaryAction={<CharacterActions characterId={id} />}>
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
