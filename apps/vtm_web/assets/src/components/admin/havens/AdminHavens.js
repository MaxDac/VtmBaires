// @flow

import React, {useContext} from "react";
import HavenMap from "../../_base/HavenMap";
import AdminHavensForm from "./AdminHavensForm";
import type {Haven} from "../../../services/queries/haven/GetHavensQuery";
import {UtilityContext} from "../../../contexts";
import SetHavenCharacterMutation from "../../../services/mutations/havens/SetHavenCharacterMutation";
import {useRelayEnvironment} from "react-relay";
import {handleMutation, isNullOrEmpty, tryCastToOneType} from "../../../_base/utils";
import DeleteHavenCharacterMutation from "../../../services/mutations/havens/DeleteHavenCharacterMutation";
import type {GenericReactComponent} from "../../../_base/types";

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

    const onCharacterSelected = (h, cId) => {
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
                        () => action().finally(_ => setFetchKey(p => p + 1)),
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
            <AdminHavensForm haven={haven}
                             open={open}
                             handleClose={_ => setOpen(_ => false)}
                             onSelected={onCharacterSelected}
                             havenCharacterId={haven?.character?.id} />
            <HavenMap onSectionSelected={onHavenSelected}
                      fetchKey={fetchKey} />
        </>
    );
};

export default AdminHavens;
