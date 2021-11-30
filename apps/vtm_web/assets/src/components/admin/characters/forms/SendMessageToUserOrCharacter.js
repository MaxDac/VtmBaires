// @flow

import type { Character } from "../../../../services/queries/character/GetCharacterCompleteQuery";

import React from "react";
import {useHistory} from "react-router";
import {MainRoutes} from "../../../MainRouter";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useCustomLazyLoadQuery } from "../../../../_base/relay-utils";
import { getCharacterUserQuery } from "../../../../services/queries/character/GetCharacterUserQuery";

type Props = {
    character: Character;
}

const AddCharacterExperienceForm = ({character}: Props): any => {
    const history = useHistory();
    const user = useCustomLazyLoadQuery(getCharacterUserQuery, {characterId: character.id})?.getCharacterUser;

    const sendMessageToUser = () => 
        history.push(MainRoutes.newMessageTo(user.id))
    
    const sendMessageToCharacter = () => 
        history.push(MainRoutes.newMessageToCharacter(character.id));

    return (
        <Grid container sx={{paddingTop: "1rem", paddingBottom: "1rem"}}>
            <Grid item xs={12} sm={6} sx={{textAlign: "center"}}>
                <Button variant="outlined"
                        onClick={sendMessageToUser}>
                    Messaggio all'Utente ({user?.name})
                </Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{textAlign: "center"}}>
                <Button variant="outlined"
                        onClick={sendMessageToCharacter}>
                    Messaggio al Personaggio
                </Button>
            </Grid>
        </Grid>
    );
}

export default AddCharacterExperienceForm;
