// @flow

import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type Props = {
    contextMenu: any;
    handleClose: () => void;
    onCopyRequested: () => void;
    phraseHasDescription?: boolean;
    onDescriptionRequested?: () => void;
}

const ChatEntryContextMenu = ({contextMenu, handleClose, onCopyRequested, phraseHasDescription, onDescriptionRequested}: Props): any => {
    const onCopyRequestedInternal = () => {
        onCopyRequested();
        handleClose();
    };

    const onDescriptionRequestedInternal = () => {
        if (onDescriptionRequested != null) {
            onDescriptionRequested();
        }

        handleClose();
    };

    const showRequestDescription = () => {
        if (phraseHasDescription === true) {
            return (
                <MenuItem onClick={onDescriptionRequestedInternal}>Descrizione</MenuItem>
            );
        };

        return (<></>);
    }

    return (
        <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
            }
        >
            <MenuItem onClick={onCopyRequestedInternal}>Copia frase</MenuItem>
            {showRequestDescription()}
        </Menu>
    );
}

export default ChatEntryContextMenu;
