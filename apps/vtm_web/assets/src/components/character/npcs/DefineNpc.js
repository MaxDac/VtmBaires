// @flow

import React, {useContext} from "react";
import Grid from "@mui/material/Grid";
import AssignNpcAttributes from "./AssignNpcAttributes";
import AssignNpcGenericStats from "./AssignNpcGenericStats";
import Button from "@mui/material/Button";
import {UtilityContext} from "../../../contexts";
import {handleMutation} from "../../../_base/utils";
import ConfirmPngMutation from "../../../services/mutations/characters/ConfirmPngMutation";
import {useRelayEnvironment} from "react-relay";
import {useHistory} from "react-router-dom";
import Typography from "@mui/material/Typography";
import { MainRoutes } from "../../MainRouter";
import type {GenericReactComponent} from "../../../_base/types";

type Props = {
    characterId: string;
}

const DefineNpc = ({characterId}: Props): GenericReactComponent => {
    const history = useHistory();
    const environment = useRelayEnvironment();
    const {openDialog, showUserNotification} = useContext(UtilityContext);

    const confirmPng = () => {
        openDialog(
            "Conferma personaggio",
            "Sei sicuro di voler confermare il personaggio? Potrai comunque continuare ad editarlo successivamente.",
            () => {
                handleMutation(() => ConfirmPngMutation(environment, characterId), showUserNotification, {
                    onCompleted: () => history.push(MainRoutes.characterDashboard(characterId))
                });
            });
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography>
                    In questa schermata puoi assegnare le informazioni generali, gli Attributi e le Abilit&agrave; del personaggio.
                </Typography>
                <Typography>
                    Ricorda che sar&agrave; sempre possibile cambiare gli attributi della scheda, associare Discipline e Vantaggi direttamente nella schermata di modifica successiva.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <AssignNpcGenericStats characterId={characterId} />
            </Grid>
            <Grid item xs={12}>
                <AssignNpcAttributes characterId={characterId} />
            </Grid>
            <Grid item xs={12} sx={{
                margin: "10px",
                padding: "10px"
            }}>
                <Button type="submit"
                        variant="outlined"
                        fullWidth
                        color="primary"
                        onClick={_ => confirmPng()}>
                    Conferma Personaggio non Giocante
                </Button>
            </Grid>
        </Grid>
    );
}

export default DefineNpc;
