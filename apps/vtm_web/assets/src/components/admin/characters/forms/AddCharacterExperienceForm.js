// @flow

import React, {useContext, useState} from "react";
import type {Character} from "../../../../services/queries/character/GetCharacterCompleteQuery";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {handleMutation, range} from "../../../../_base/utils";
import MenuItem from "@mui/material/MenuItem";
import {UtilityContext} from "../../../../contexts";
import {useRelayEnvironment} from "react-relay";
import ChangeCharacterExperienceMutation from "../../../../services/mutations/admin/ChangeCharacterExperienceMutation";
import type {GenericReactComponent} from "../../../../_base/types";

type Props = {
    character: Character;
    onUpdate: () => void;
}

const AddCharacterExperienceForm = ({character, onUpdate}: Props): GenericReactComponent => {
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const environment = useRelayEnvironment();

    const [experience, setExperience] = useState(1);

    const onExperienceChanged = ({target: {value}}) => {
        setExperience(_ => value);
    };

    const possibleValuesOptions = () => {
        const options = [];

        for (let i of range(-10, 5)) {
            options.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }

        return options;
    };

    const changeCharacterExperience = _ => {
        const changeTypeLabel = experience < 0 ? "sottrarre" : "aggiungere";

        openDialog(
            `Aggiunta di esperienza per ${character.name ?? ""}`,
            `Sei sicuro di voler ${changeTypeLabel} ${experience} punti esperienza a ${character.name ?? ""}?`,
            () => {
                const promise = ChangeCharacterExperienceMutation(environment, {
                    characterId: character.id,
                    experienceChange: experience
                });

                handleMutation(() => promise, showUserNotification, {
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
                <Grid item xs={12} sm={6} sx={{textAlign: "center"}}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel htmlFor="experience">Esperienza</InputLabel>
                        <Select defaultValue="1"
                                id="experience"
                                label="Esperienza"
                                onChange={onExperienceChanged}>
                            {possibleValuesOptions()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} sx={{paddingTop: "20px", textAlign: "center"}}>
                    <Button variant="outlined"
                            onClick={changeCharacterExperience}>
                        Aggiungi / Sottrai Esperienza
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddCharacterExperienceForm;
