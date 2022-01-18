// @flow

import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CharactersSelectControl from "../../_base/CharactersSelectControl";
import type {Haven} from "../../../services/queries/haven/GetHavensQuery";
import Box from "@mui/material/Box";

type Props = {
    haven: ?Haven;
    open: boolean;
    handleClose: () => void;
    onSelected: (?Haven, string) => void;
    havenCharacterId?: string;
};

const AdminHavensForm = ({haven, open, handleClose, onSelected, havenCharacterId}: Props): any => {
    const [characterId, setCharacterId] = React.useState(havenCharacterId ?? "");

    const onSubmit = () => {
        onSelected(haven, characterId);
        handleClose();
    };

    console.debug("character id", havenCharacterId);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Assegna rifugio</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Seleziona il personaggio a cui assegnare la locazione scelta.
                </DialogContentText>
                <Box sx={{
                    width: "100%",
                    textAlign: "center"
                }}>
                    <CharactersSelectControl label="Personaggio"
                                             onChange={v => setCharacterId(v)}
                                             value={havenCharacterId} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={onSubmit}>Assegna</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdminHavensForm;
