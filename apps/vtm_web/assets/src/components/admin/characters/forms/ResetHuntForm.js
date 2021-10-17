// @flow

import React, {useContext} from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import type {Character} from "../../../../services/queries/character/GetCharacterCompleteQuery";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../../../contexts";
import {handleMutation} from "../../../../_base/utils";
import ResetHuntMutation from "../../../../services/mutations/admin/ResetHuntMutation";

type Props = {
    character: Character;
}

const ResetHuntForm = ({character}: Props): any => {
    const environment = useRelayEnvironment();
    const {showUserNotification, openDialog} = useContext(UtilityContext);

    const resetCharacterHunt = () =>
        openDialog(
            "Resetta esito caccia",
            `Sei sicuro di voler resettare l'esito della caccia di ${character?.name ?? ""}?`,
            () => {
                handleMutation(
                    () => ResetHuntMutation(environment, character?.id),
                    showUserNotification, {
                        successMessage: "L'esito della caccia è stato correttamente resettato."
                    });
            }
        );

    return (
        <Grid item xs={12} sx={{
            margin: "20px",
            textAlign: "center"
        }}>
            <Button variant="container"
                    onClick={resetCharacterHunt}>
                Resetta l'esito della Caccia
            </Button>
        </Grid>
    );
}

export default ResetHuntForm;
