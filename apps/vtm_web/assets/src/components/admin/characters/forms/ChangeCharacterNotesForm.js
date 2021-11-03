// @flow

import React, {useContext, useState} from "react";
import type {Character} from "../../../../services/queries/character/GetCharacterCompleteQuery";
import {UtilityContext} from "../../../../contexts";
import {useRelayEnvironment} from "react-relay";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {handleMutation} from "../../../../_base/utils";
import ChangeCharacterNotesMutation from "../../../../services/mutations/admin/ChangeCharacterNotesMutation";

type Props = {
    character: Character;
    onUpdate: () => void;
};

const ChangeCharacterNotesForm = ({character, onUpdate}: Props): any => {
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const environment = useRelayEnvironment();

    const [advantages, setAdvantages] = useState(character?.advantages ?? "");
    const [notes, setNotes] = useState(character?.notes ?? "");

    const onAdvantagesChanged = ({target: {value}}) => {
        setAdvantages(_ => value);
    };

    const onNotesChanged = ({target: {value}}) => {
        setNotes(_ => value);
    };

    const changeCharacterNotes = _ => {
        openDialog(
            `Cambio di status per ${character.name ?? ""}`,
            `Sei sicuro di voler cambiare le note del personaggio?`,
            () => {
                handleMutation(() => ChangeCharacterNotesMutation(environment, {
                    characterId: character.id,
                    advantages,
                    notes
                }), showUserNotification, {
                    successMessage: "Il personaggio è stato modificato correttamente. Per visualizzare le nuove modifiche, è necessario aggiornare la pagina (F5)",
                    errorMessage: "C'è stato un errore durante la modifica del personaggio, contatta l'admin per maggiori informazioni.",
                    onCompleted: onUpdate
                });
            }
        );
    };

    return (
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={12} sx={{margin: "10px"}}>
                    <TextField id="advantages"
                               label="Vantaggi"
                               fullWidth
                               multiline
                               rows={3}
                               defaultValue={advantages}
                               onChange={onAdvantagesChanged}
                               variant="filled" />
                </Grid>
                <Grid item xs={12} sx={{margin: "10px"}}>
                    <TextField id="notes"
                               label="Notes"
                               fullWidth
                               multiline
                               rows={3}
                               defaultValue={notes}
                               onChange={onNotesChanged}
                               variant="filled" />
                </Grid>
                <Grid item xs={12} sx={{
                    padding: "10px",
                    textAlign: "center"
                }}>
                    <Button variant="outlined"
                            onClick={changeCharacterNotes}>Aggiorna</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ChangeCharacterNotesForm;
