// @flow

import React, {useContext, useState} from "react";
import type {Character} from "../../../../services/queries/character/GetCharacterCompleteQuery";
import useAttributesSlimQuery from "../../../../services/queries/info/AttributesSlimQuery";
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import {handleMutation, range} from "../../../../_base/utils";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../../../contexts";
import ChangeCharacterAttributeMutation from "../../../../services/mutations/admin/ChangeCharacterAttributeMutation";

type Props = {
    character: Character;
}

const ChangeCharacterAttributeForm = ({character}: Props): any => {
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const environment = useRelayEnvironment();
    const attributes = useAttributesSlimQuery()?.attributes ?? [];

    const [attributeId, setAttributeId] = useState<?string>(null);
    const [newValue, setNewValue] = useState(0);

    const changeCharacterAttribute = _ => {
        if (attributeId == null) {
            showUserNotification({
                type: "error",
                message: "Devi selezionare un attributo"
            });
            return;
        }

        const attributeName = attributes.filter(x => x.id === attributeId)[0]?.name;

        openDialog(
            `Cambio di attributo per ${character.name ?? ""}`,
            `Sei sicuro di voler cambiare il valore di ${attributeName} a ${newValue}?`,
            () =>
                handleMutation(() => ChangeCharacterAttributeMutation(environment, {
                    characterId: character.id,
                    attributeId: attributeId,
                    newValue: newValue
                }), showUserNotification, {
                    successMessage: "Il personaggio è stato modificato correttamente. Per visualizzare le nuove modifiche, è necessario aggiornare la pagina (F5)",
                    errorMessage: "C'è stato un errore durante la modifica del personaggio, contatta l'admin per maggiori informazioni."
                })
        );
    }

    const newAttributeSection = sectionName =>
        (<ListSubheader key={sectionName}>{sectionName}</ListSubheader>);

    const attributeSelector = (id, name) =>
        (<MenuItem key={id} value={id}>{name}</MenuItem>);

    const attributesValues = () => attributes
        .reduce(([acc, previousTypeName], {id, name, attributeType: {name: typeName}}) => {
            const newAcc =
                typeName !== previousTypeName
                    ? [...acc, newAttributeSection(typeName)]
                    : acc;

            return [[...newAcc, attributeSelector(id, name)], typeName];
        }, [[], ""]);

    const possibleValuesOptions = () => {
        const options = [];

        for (let i of range(0, 5)) {
            options.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }

        return options;
    };

    const controlContainerStyle = {
        textAlign: "center"
    };

    const attributeSelected = ({target: {value}}) => setAttributeId(_ => value);

    const valueSelected = ({target: {value}}) => setNewValue(_ => value);

    return (
        <Grid item xs={12}>
            <Grid container sx={{margin: "20px"}}>
                <Grid item xs={12} sm={4} sx={controlContainerStyle}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel htmlFor="attribute-select">Attributo</InputLabel>
                        <Select defaultValue=""
                                id="attribute-select"
                                label="Attributo"
                                onChange={attributeSelected}>
                            {attributesValues()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} sx={controlContainerStyle}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel htmlFor="value-select">Nuovo Valore</InputLabel>
                        <Select defaultValue="0"
                                id="value-select"
                                label="Nuovo valore"
                                onChange={valueSelected}>
                            {possibleValuesOptions()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} sx={{paddingTop: "20px"}}>
                    <Button variant="contained"
                            onClick={changeCharacterAttribute}>Aggiorna attributo</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ChangeCharacterAttributeForm;
