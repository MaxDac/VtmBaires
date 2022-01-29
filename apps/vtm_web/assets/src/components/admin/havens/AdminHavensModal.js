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
import type {SetResonanceZoneRequest} from "../../../services/mutations/havens/__generated__/SetResonanceZoneMutation.graphql";
import type {SetDangerZoneRequest} from "../../../services/mutations/havens/__generated__/SetDangerZoneMutation.graphql";
import AdminHavensFormSelector from "./forms/AdminHavensFormSelector";

type Props = {
    haven: ?Haven;
    open: boolean;
    handleClose: () => void;
    onSelected: (?Haven, string, SetHavenInfoRequest) => void;
    onMarkResonance: (?Haven, SetResonanceZoneRequest) => void;
    onSetDanger: (?Haven, SetDangerZoneRequest) => void;
    havenCharacterId?: string;
};

const AdminHavensModal = ({haven, open, handleClose, onSelected, onMarkResonance, onSetDanger, havenCharacterId}: Props): GenericReactComponent => {
    const triggerButton = useRef();

    const triggerSubmit = _ => triggerButton.current?.click();

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
    };

    const onDangerUpdateSubmitted = formInfo => {
        onSetDanger(haven, {
            danger: Number(formInfo.danger),
            range: Number(formInfo.range)
        });

        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Modifica rifugio</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Modifica il rifugio selezionato
                </DialogContentText>
                <AdminHavensFormSelector haven={haven}
                                         havenCharacterId={havenCharacterId}
                                         onSetHavenSubmitted={onSetHavenSubmitted}
                                         onMarkResonanceSubmitted={onMarkResonanceSubmitted}
                                         onDangerUpdateSubmitted={onDangerUpdateSubmitted}
                                         ref={triggerButton} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={triggerSubmit}>Modifica</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdminHavensModal;
