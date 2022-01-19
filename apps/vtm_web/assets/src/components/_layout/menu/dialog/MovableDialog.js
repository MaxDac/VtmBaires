// @flow

import React from "react";
import Dialog from '@mui/material/Dialog';
import DraggablePaper from "../../../../_base/components/DraggablePaper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {menuIconStyle} from "../menu-base-utils";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import {useSession} from "../../../../services/session-service";
import type {GenericReactComponent} from "../../../../_base/types";

type Props = {
    open: boolean;
    handleClose: () => void;
    children: any;
};

const MovableDialog = ({open, handleClose, children}: Props): GenericReactComponent => {
    const theme = useTheme();
    const [,character] = useSession();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
                fullScreen={fullScreen}
                PaperComponent={props => <DraggablePaper {...props} handleid="draggable-main-dialog" />}
                keepMounted
                aria-labelledby="draggable-main-dialog">
            <AppBar sx={{ position: 'relative', cursor: "move" }} id="draggable-main-dialog">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close">
                        <CloseIcon sx={menuIconStyle} />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {character?.name}
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </Dialog>
    );
}

export default MovableDialog;
