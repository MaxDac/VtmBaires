// @flow

import React from "react";
import {MainRoutes} from "../../../MainRouter";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useCustomLazyLoadQuery } from "../../../../_base/relay-utils";
import { getCharacterUserQuery } from "../../../../services/queries/character/GetCharacterUserQuery";
import type {GenericReactComponent} from "../../../../_base/types";
import type { Character } from "../../../../services/queries/character/GetCharacterCompleteQuery";
import {useNavigate} from "react-router-dom";

type Props = {
    character: Character;
}

const AddCharacterExperienceForm = ({character}: Props): GenericReactComponent => {
    const navigate = useNavigate();
    const user = useCustomLazyLoadQuery(getCharacterUserQuery, {characterId: character.id})?.getCharacterUser;

    const sendMessageToUser = () =>
        navigate(MainRoutes.newMessageTo(user.id))
    
    const sendMessageToCharacter = () => 
        navigate(MainRoutes.newMessageToCharacter(character.id));

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
