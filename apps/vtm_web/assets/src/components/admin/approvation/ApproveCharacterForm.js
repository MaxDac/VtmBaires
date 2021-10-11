// @flow

import React, {useContext} from "react";
import {Character} from "../../../services/queries/character/GetCharacterCompleteQuery";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ApproveCharacterMutation from "../../../services/mutations/characters/ApproveCharacterMutation";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../../contexts";
import {handleMutation} from "../../../_base/utils";
import {useHistory} from "react-router-dom";
import {Routes} from "../../../AppRouter";
import Box from "@mui/material/Box";

type Props = {
    character: Character
}

const ApproveCharacterForm = ({character}: Props): any => {
    const history = useHistory();
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const environment = useRelayEnvironment();

    const approveCharacter = _ => {
        openDialog(`Accetta ${character.name ?? ""}`, "Sei sicuro di voler accettare questo personaggio?", () =>
            handleMutation(() => ApproveCharacterMutation(environment, character.id), showUserNotification, {
                successMessage: "Il personaggio è stato accettato.",
                errorMessage: "C'è stato un errore durante l'accettazione del personaggio, contatta l'admin per maggiori informazioni.",
                onCompleted: () => history.push(Routes.unapprovedCharacters)
            })
        );
    }

    if (character?.approved !== true) {
        return (
            <Grid item xs={12}>
                <Box sx={{
                    margin: "20px",
                    textAlign: "center"
                }}>
                    <Button variant="contained"
                            onClick={approveCharacter}>Approva personaggio</Button>
                </Box>
            </Grid>
        );
    }

    return (<></>);
}

export default ApproveCharacterForm;
