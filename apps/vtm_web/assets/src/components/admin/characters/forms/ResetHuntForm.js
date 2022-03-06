// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import type {Character} from "../../../../services/queries/character/GetCharacterCompleteQuery";
import {useRelayEnvironment} from "react-relay";
import {handleMutation} from "../../../../_base/utils";
import ResetHuntMutation from "../../../../services/mutations/admin/ResetHuntMutation";
import type {GenericReactComponent} from "../../../../_base/types";
import {useDialog} from "../../../../_base/providers/DialogProvider";
import {useCustomSnackbar} from "../../../../_base/notification-utils";

type Props = {
    character: Character;
    onUpdate: () => void;
}

const ResetHuntForm = ({character, onUpdate}: Props): GenericReactComponent => {
    const environment = useRelayEnvironment();
    const {showDialog} = useDialog()
    const {enqueueSnackbar} = useCustomSnackbar();

    const resetCharacterHunt = () =>
        showDialog(
            "Resetta esito caccia",
            `Sei sicuro di voler resettare l'esito della caccia di ${character?.name ?? ""}?`,
            () => {
                handleMutation(
                    () => ResetHuntMutation(environment, character?.id),
                    enqueueSnackbar, {
                        successMessage: "L'esito della caccia è stato correttamente resettato.",
                        onCompleted: onUpdate
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
