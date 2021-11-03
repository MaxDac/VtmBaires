// @flow

import React, {useContext, useState} from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {useTheme} from "@mui/styles";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetCreationTemplateQuery} from "../../../services/queries/character/__generated__/GetCreationTemplateQuery.graphql";
import {getCreationTemplateQuery} from "../../../services/queries/character/GetCreationTemplateQuery";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {UtilityContext} from "../../../contexts";
import ApplyTemplateToCharacterMutation from "../../../services/mutations/characters/ApplyTemplateToCharacterMutation";
import {useRelayEnvironment} from "react-relay";
import {useHistory} from "react-router-dom";
import { MainRoutes } from "../../MainRouter";

type Props = {
    characterId: string;
}

const TemplateSelectionControl = ({characterId}: Props): any => {
    const history = useHistory();
    const theme = useTheme();
    const {showUserNotification, openDialog, setWait} = useContext(UtilityContext);
    const environment = useRelayEnvironment();
    const templates = useCustomLazyLoadQuery<GetCreationTemplateQuery>(getCreationTemplateQuery, {})
        ?.getCreationTemplates ?? [];

    const [template, setTemplate] = useState<?string>(null);

    const items = () =>
        [(<MenuItem key="0" value={null}>None</MenuItem>)]
            .concat(templates.map(t => (
                <MenuItem key={t?.id} value={t?.id}>{t?.name}</MenuItem>
            )));

    const onTemplateSelectionChange = ({target: {value}}) => {
        setTemplate(value);
    };

    const selectTemplate = () => {
        if (template == null || template === "") {
            showUserNotification({
                type: "warning",
                message: "Devi prima selezionare un template."
            });
        }
        else {
            openDialog("Applicazione del template", "Sei sicuro di voler applicare il template la tuo personaggio?", () => {
                setWait(true);
                ApplyTemplateToCharacterMutation(environment, characterId, template)
                    .then(response => {
                        if (!response) {
                            showUserNotification({
                                type: "warning",
                                message: "C'è stato un problema nell'applicazione del template, prova ad aggiorare la pagina"
                            });
                        }
                        else {
                            history.push(MainRoutes.creation4);
                        }
                    })
                    .catch(e => {
                        console.error("There was an error while saving the character", e);
                        showUserNotification({
                            type: "error",
                            message: "C'è stato un problema nell'applicazione del template, prova ad aggiorare la pagina"
                        });
                    })
                    .finally(() => setWait(false));
            })
        }
    }

    return (
        <Grid container sx={{
            textAlign: "center"
        }}>
            <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" sx={{
                    margin: theme.spacing(1),
                    minWidth: 150
                }}>
                    <InputLabel id="select-label">Templates</InputLabel>
                    <Select
                        labelId="select-label"
                        fullWidth
                        onChange={onTemplateSelectionChange}
                        sx={{
                            minWidth: theme.spacing(10)
                        }}>
                        {items()}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} sx={{display: "inline-flex"}}>
                <Button variant="outlined"
                        onClick={selectTemplate}
                        sx={{marginTop: "auto", marginBottom: "auto"}}>
                    Seleziona template
                </Button>
            </Grid>
        </Grid>
    );
}

export default TemplateSelectionControl;
