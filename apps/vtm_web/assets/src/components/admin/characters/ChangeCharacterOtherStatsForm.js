// @flow

import React, {useContext, useState} from "react";
import type {Character} from "../../../services/queries/character/GetCharacterCompleteQuery";
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {handleMutation, range} from "../../../_base/utils";
import Button from "@mui/material/Button";
import {UtilityContext} from "../../../contexts";
import {useRelayEnvironment} from "react-relay";
import ChangeCharacterOtherStatsMutation from "../../../services/mutations/admin/ChangeCharacterOtherStatsMutation";
import type {PredatorTypesQuery} from "../../../services/queries/info/__generated__/PredatorTypesQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {predatorTypesQuery} from "../../../services/queries/info/PredatorTypesQuery";

type Props = {
    character: Character;
}

const ChangeCharacterOtherStatsForm = ({character}: Props): any => {
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const environment = useRelayEnvironment();
    const predatorTypes = useCustomLazyLoadQuery<PredatorTypesQuery>(predatorTypesQuery, {})
        ?.predatorTypes;

    const [willpower, setWillpower] = useState(character?.willpower);
    const [humanity, setHumanity] = useState(character?.humanity);
    const [predatorType, setPredatorType] = useState(character?.predatorType?.id);

    const changeCharacterOtherStats = _ => {
        openDialog(
            `Cambio di status per ${character.name ?? ""}`,
            `Sei sicuro di voler cambiare umanità a ${humanity} e Forza di Volontà a ${willpower}?`,
            () =>
                handleMutation(() => ChangeCharacterOtherStatsMutation(environment, {
                    characterId: character.id,
                    humanity: humanity,
                    willpower: willpower,
                    predatorTypeId: predatorType
                }), showUserNotification, {
                    successMessage: "Il personaggio è stato modificato correttamente. Per visualizzare le nuove modifiche, è necessario aggiornare la pagina (F5)",
                    errorMessage: "C'è stato un errore durante la modifica del personaggio, contatta l'admin per maggiori informazioni."
                })
        );
    };

    const menuItems = () => {
        const values = [];

        for (const v of range(1, 10)) {
            values.push(<MenuItem key={v} value={v}>{v}</MenuItem>);
        }

        return values;
    };

    const predatorTypeItems = () =>
        predatorTypes?.map(t => <MenuItem key={t?.id} value={t?.id}>{t?.name}</MenuItem>);

    const onHumanityChanged = ({target: {value}}) => {
        setHumanity(_ => value);
    };

    const onWillpowerChanged = ({target: {value}}) => {
        setWillpower(_ => value);
    };

    const onPredatorTypeChanged = ({target: {value}}) => {
        setPredatorType(_ => value);
    }

    return (
        <Grid item xs={12} sx={{margin: "20px"}}>
            <Grid container>
                <Grid item xs={12} md={3} sx={{
                    textAlign: "center"
                }}>
                    <FormControl sx={{width: "150px"}}>
                        <InputLabel id="humanity-label">Umanità</InputLabel>
                        <Select
                            labelId="humanity-label"
                            id="humanity"
                            value={humanity}
                            label="Umanità"
                            onChange={onHumanityChanged}>
                            {menuItems()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3} sx={{
                    textAlign: "center"
                }}>
                    <FormControl sx={{width: "150px"}}>
                        <InputLabel id="willpower-label">Forza di Volontà</InputLabel>
                        <Select
                            labelId="willpower-label"
                            id="willpower"
                            value={willpower}
                            label="Forza di Volontà"
                            onChange={onWillpowerChanged}>
                            {menuItems()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3} sx={{
                    textAlign: "center"
                }}>
                    <FormControl sx={{width: "150px"}}>
                        <InputLabel id="predator-type-label">Predatore</InputLabel>
                        <Select
                            labelId="predator-type-label"
                            id="predator-type"
                            value={predatorType}
                            label="Predatore"
                            onChange={onPredatorTypeChanged}>
                            {predatorTypeItems()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} sx={{paddingTop: "10px"}}>
                    <Button variant="contained"
                            onClick={changeCharacterOtherStats}>Aggiorna</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ChangeCharacterOtherStatsForm;
