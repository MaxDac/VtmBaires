// @flow

import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import ApproveCharacterMutation from "../../../services/mutations/characters/ApproveCharacterMutation";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../../contexts";
import {handleMutation} from "../../../_base/utils";
import {useHistory} from "react-router-dom";
import Box from "@mui/material/Box";
import type {Character} from "../../../services/queries/character/GetCharacterCompleteQuery";
import { MainRoutes } from "../../MainRouter";
import RejectCharacterMutation from "../../../services/mutations/characters/RejectCharacterMutation";
import type {GenericReactComponent} from "../../../_base/types";

type Props = {
    character: Character;
}

const ApproveCharacterForm = ({character}: Props): GenericReactComponent => {
    const history = useHistory();
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const environment = useRelayEnvironment();
    const [reason, setReason] = useState<?string>(null);

    const approveCharacter = _ => {
        openDialog(`Accetta ${character.name ?? ""}`, "Sei sicuro di voler accettare questo personaggio?", () => {
            const promise: Promise<boolean> = ApproveCharacterMutation(environment, character.id, reason ?? "");
            handleMutation(() => promise, showUserNotification, {
                successMessage: "Il personaggio è stato accettato.",
                errorMessage: "C'è stato un errore durante l'accettazione del personaggio, contatta l'admin per maggiori informazioni.",
                onCompleted: () => history.push(MainRoutes.unapprovedCharacters)
            });
        });
    };

    const rejectCharacter = _ => {
        if (reason != null && reason !== "") {
            openDialog(`Rifiuta ${character.name ?? ""}`, "Sei sicuro di voler rifiutare questo personaggio?", () => {
                const promise: Promise<boolean> = RejectCharacterMutation(environment, character.id, reason);
                handleMutation(() => promise, showUserNotification, {
                    successMessage: "Il personaggio è stato correttamente rifiutato.",
                    errorMessage: "C'è stato un errore durante l'accettazione del personaggio, contatta l'admin per maggiori informazioni.",
                    onCompleted: () => history.push(MainRoutes.unapprovedCharacters)
                });
            });
        }
        else {
            showUserNotification({
                type: "warning",
                message: "Non puoi rifiutare un personaggio senza dare una motivazione"
            })
        }
    };

    if (character?.approved !== true && character?.isComplete === true) {
        return (
            <Grid item xs={12}>
                <Paper variant="outlined" sx={{margin: "10px"}}>
                    <Grid item xs={12}>
                        <Box sx={{
                            margin: "20px",
                            textAlign: "center"
                        }}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button variant="outlined"
                                            onClick={rejectCharacter}>Rifiuta personaggio</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="outlined"
                                            onClick={approveCharacter}>Approva personaggio</Button>
                                </Grid>
                                <Grid item xs={12} sx={{
                                    paddingTop: "15px",
                                    paddingLeft: "10px", 
                                    paddingRight: "10px"
                                }}>
                                    <TextField id="filled-basic" 
                                            label="Ragione" 
                                            variant="filled" 
                                            onChange={({target: {value}}) => setReason(_ => value)}
                                            fullWidth />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
        );
    }

    return (<></>);
}

export default ApproveCharacterForm;
