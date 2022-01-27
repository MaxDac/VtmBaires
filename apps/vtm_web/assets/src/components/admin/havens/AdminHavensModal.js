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
import type {
    SetResonanceZoneRequest
} from "../../../services/mutations/havens/__generated__/SetResonanceZoneMutation.graphql";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import AdminHavensForm from "./forms/AdminHavensForm";
import AdminHavensResonanceForm from "./forms/AdminHavensResonanceForm";
import AdminHavensDangerForm from "./forms/AdminHavensDangerForm";
import {useResonanceTypes} from "../../../services/queries/info/GetResonanceTypesQuery";
import type {SetDangerZoneRequest} from "../../../services/mutations/havens/__generated__/SetDangerZoneMutation.graphql.js";

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
    const resonances = useResonanceTypes().map(x => [x, x]);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Assegna Rifugio" value="1" />
                                <Tab label="Traccia Risonanza" value="2" />
                                <Tab label="Aggiungi pericolo" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <AdminHavensForm resonances={resonances}
                                             haven={haven}
                                             havenCharacterId={havenCharacterId}
                                             onSubmit={onSetHavenSubmitted}
                                             ref={triggerButton} />
                        </TabPanel>
                        <TabPanel value="2">
                            <AdminHavensResonanceForm resonances={resonances}
                                                      haven={haven}
                                                      onSubmit={onMarkResonanceSubmitted}
                                                      ref={triggerButton} />
                        </TabPanel>
                        <TabPanel value="3">
                            <AdminHavensDangerForm haven={haven}
                                                   onSubmit={onDangerUpdateSubmitted}
                                                   ref={triggerButton} />
                        </TabPanel>
                    </TabContext>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={triggerSubmit}>Modifica</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdminHavensModal;
