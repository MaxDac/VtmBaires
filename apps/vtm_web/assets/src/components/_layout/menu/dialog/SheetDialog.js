// @flow

import React from "react";
import MovableDialog from "./MovableDialog";
import type {GenericReactComponent} from "../../../../_base/types";

const CharacterSheetComponent = React.lazy(() => import('../../../character/sheet-components/CharacterSheetComponent'));

type Props = {
    open: boolean;
    handleClose: () => void;
}

const SheetDialog = ({open, handleClose}: Props): GenericReactComponent => {
    return (
        <MovableDialog open={open} handleClose={handleClose}>
            <CharacterSheetComponent contained />
        </MovableDialog>
    );
}

export default SheetDialog;
