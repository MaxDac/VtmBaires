// @flow

import React, {useRef} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type {Haven} from "../../../services/queries/haven/GetHavensQuery";
import type {GenericReactComponent} from "../../../_base/types";
import type {SetHavenInfoRequest} from "../../../services/mutations/havens/__generated__/SetHavenInfoMutation.graphql";
import AdminHavensForm from "./AdminHavensForm";
import {useResonanceTypes} from "../../../services/queries/info/GetResonanceTypesQuery";
import AdminHavensResonanceForm from "./AdminHavensResonanceForm";
import type {
    SetResonanceZoneRequest
} from "../../../services/mutations/havens/__generated__/SetResonanceZoneMutation.graphql";

type Props = {
    haven: ?Haven;
    open: boolean;
    handleClose: () => void;
    onSelected: (?Haven, string, SetHavenInfoRequest) => void;
    onMarkResonance: (?Haven, SetResonanceZoneRequest) => void;
    havenCharacterId?: string;
};

const AdminHavensModal = ({haven, open, handleClose, onSelected, onMarkResonance, havenCharacterId}: Props): GenericReactComponent => {
    const resonances = useResonanceTypes().map(x => [x, x]);

    const [showMarkResonanceForm, setShowMarkResonanceForm] = React.useState<boolean>(false);
    const triggerButton = useRef();

    const triggerSubmit = _ => triggerButton.current?.click();

    const markResonanceTitle = () =>
        showMarkResonanceForm
            ? "Modifica Locazione"
            : "Traccia Risonanza";

    const submitTitle = () =>
        showMarkResonanceForm
            ? "Traccia"
            : "Assegna";

    const onMarkResonanceTriggered = _ => setShowMarkResonanceForm(p => !p);

    const onSetHavenSubmitted = formInfo => {
        onSelected(haven, formInfo.havenCharacterId, {
            resonance: String(formInfo.resonance),
            danger: Number(formInfo.danger),
            difficulty: Number(formInfo.difficulty),
            groundControl: Number(formInfo.groundControl),
            ownerDifficulty: Number(formInfo.ownerDifficulty),
            resourcesLevel: Number(formInfo.resourcesLevel),
        });

        handleClose();
    };

    const onMarkResonanceSubmitted = formInfo => {
        onMarkResonance(haven, {
            resonance: String(formInfo.resonance),
            power: Number(formInfo.power)
        });

        handleClose();
    }

    const form = () => {
        if (haven != null) {
            if (!showMarkResonanceForm) {
                return (
                    <AdminHavensForm resonances={resonances}
                                     haven={haven}
                                     havenCharacterId={havenCharacterId}
                                     onSubmit={onSetHavenSubmitted}
                                     ref={triggerButton} />
                );
            }
            else {
                return (
                    <AdminHavensResonanceForm resonances={resonances}
                                              haven={haven}
                                              onSubmit={onMarkResonanceSubmitted}
                                              ref={triggerButton} />
                );
            }
        }

        return (<></>);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Assegna rifugio</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Seleziona il personaggio a cui assegnare la locazione scelta.
                </DialogContentText>
                {form()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={onMarkResonanceTriggered}>{markResonanceTitle()}</Button>
                <Button onClick={triggerSubmit}>{submitTitle()}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdminHavensModal;
