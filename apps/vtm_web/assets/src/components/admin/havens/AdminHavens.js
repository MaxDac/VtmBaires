// @flow

import React, {useContext} from "react";
import HavenMap from "../../_base/HavenMap";
import AdminHavensModal from "./AdminHavensModal";
import type {Haven} from "../../../services/queries/haven/GetHavensQuery";
import {UtilityContext} from "../../../contexts";
import SetHavenCharacterMutation from "../../../services/mutations/havens/SetHavenCharacterMutation";
import {useRelayEnvironment} from "react-relay";
import {handleMutation, isNullOrEmpty, tryCastToOneType} from "../../../_base/utils";
import DeleteHavenCharacterMutation from "../../../services/mutations/havens/DeleteHavenCharacterMutation";
import type {GenericReactComponent} from "../../../_base/types";
import SetHavenInfoMutation from "../../../services/mutations/havens/SetHavenInfoMutation";
import SetResonanceZoneMutation from "../../../services/mutations/havens/SetResonanceZoneMutation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ResetResonancesMutation from "../../../services/mutations/havens/ResetResonancesMutation";
import SetDangerZoneMutation from "../../../services/mutations/havens/SetDangerZoneMutation";

const AdminHavens = (): GenericReactComponent => {
    const environment = useRelayEnvironment();
    const {openDialog, showUserNotification} = useContext(UtilityContext);

    const [haven, setHaven] = React.useState<?Haven>(null);
    const [fetchKey, setFetchKey] = React.useState(0);
    const [open, setOpen] = React.useState<boolean>(false);

    const onHavenSelected = h => {
        const haven = tryCastToOneType<Haven, string>(h);

        if (haven != null) {
            setHaven(_ => haven);
            setOpen(_ => true);
        }
    };

    const onCharacterSubmitted = (h, cId, request) => {
        if (h?.id != null) {
            const hId = h.id;

            const [title, message, action] =
                isNullOrEmpty(cId)
                    ? [
                        "Riassegnazione Dominio",
                        "Sei sicuro di voler togliere il Dominio dal personaggio?",
                        () => DeleteHavenCharacterMutation(environment, {
                            havenId: hId
                        })
                    ]
                    : [
                        "Assegnazione Dominio",
                        "Sei sicuro di voler assegnare questa locazione al personaggio selezionato?",
                        () => SetHavenCharacterMutation(environment, {
                            characterId: cId,
                            havenId: hId
                        })
                    ];

            openDialog(title, message,
                () => {
                    handleMutation(
                        () => action()
                            .then(_ => SetHavenInfoMutation(environment, hId, request))
                            .finally(_ => setFetchKey(p => p + 1)),
                        showUserNotification,
                        {
                            successMessage: "La modifica è stata effettuata con successo."
                        });
                });
        }
    };
    
    const onMarkResonance = (h, {resonance, power}) => {
        if (h?.id != null && resonance != null) {
            const hId = h.id;

            openDialog("Assegnazione Risonanza", `Sei sicuro di voler marcare questa zona con una risonanza ${resonance}?`,
                () => {
                    handleMutation(
                        () => SetResonanceZoneMutation(environment, hId, {
                            resonance: resonance,
                            power: power ?? 3
                        })
                            .finally(_ => setFetchKey(p => p + 1)),
                        showUserNotification,
                        {
                            successMessage: "La modifica è stata effettuata con successo."
                        });
                });
        }
    };

    const onResetResonances = _ => {
        openDialog("Resetta Risonanze", `Sei sicuro di voler resettare tutte le risonanze nel Dominio? Questo cancellerà completamente lo stato attuale.`,
            () => {
                handleMutation(
                    () => ResetResonancesMutation(environment)
                        .finally(_ => setFetchKey(p => p + 1)),
                    showUserNotification,
                    {
                        successMessage: "La modifica è stata effettuata con successo."
                    });
            });
    };

    const onSetDanger = (h, {danger, range}) => {
        if (h?.id != null) {
            const hId = h.id;

            openDialog("Assegnazione Pericolo", `Sei sicuro di voler cambiare il pericolo di questa zona?`,
                () => {
                    handleMutation(
                        () => SetDangerZoneMutation(environment, hId, {
                            danger,
                            range
                        })
                            .finally(_ => setFetchKey(p => p + 1)),
                        showUserNotification,
                        {
                            successMessage: "La modifica è stata effettuata con successo."
                        });
                });
        }
    };

    return (
        <>
            <h1 style={{
                fontFamily: 'Disturbed',
                marginRight: "20px"
            }}>
                Gestione rifugio
            </h1>
            <Box sx={{
                width: "100%",
                padding: "1rem",
                display: "flex",
                justifyContent: "center"
            }}>
                <Button variant="outlined" onClick={onResetResonances}>
                    Resetta Risonanze
                </Button>
            </Box>
            <AdminHavensModal haven={haven}
                              open={open}
                              handleClose={_ => setOpen(_ => false)}
                              onSelected={onCharacterSubmitted}
                              onMarkResonance={onMarkResonance}
                              onSetDanger={onSetDanger}
                              havenCharacterId={haven?.character?.id} />
            <HavenMap onSectionSelected={onHavenSelected}
                      fetchKey={fetchKey} />
        </>
    );
};

export default AdminHavens;
