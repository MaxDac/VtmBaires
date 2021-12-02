// @flow

import React from "react";
import MovableDialog from "./MovableDialog";

const CharacterSheet = React.lazy(() => import('../../../character/CharacterSheet'));

type Props = {
    open: boolean;
    handleClose: () => void;
}

const SheetDialog = ({open, handleClose}: Props): any => {
    return (
        <MovableDialog open={open} handleClose={handleClose}>
            <CharacterSheet contained />
        </MovableDialog>
    );
}

export default SheetDialog;
