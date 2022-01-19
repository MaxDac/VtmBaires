// @flow

import React, {Suspense} from "react";
import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import {useTheme} from "@mui/material/styles";
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Fade from "@mui/material/Fade";
import {useMediaQuery} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import {menuIconStyle} from "../menu/menu-base-utils";
import OnlineControlDialog from "./OnlineControlDialog";
import Skeleton from "@mui/material/Skeleton";
import type {GenericReactComponent} from "../../../_base/types";

const SuspenseFallback = () => (<Skeleton variant="circular" width={40} height={40} />);

const Transition = React.forwardRef((props, ref) =>
    <Fade ref={ref} {...props} />);

const OnlineControl = (): GenericReactComponent => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => setOpen(_ => false);

    return (
        <Suspense fallback={<SuspenseFallback />}>
            <Tooltip title="Online" placement="bottom">
                <IconButton aria-label="Online" onClick={_ => setOpen(_ => true)}>
                    <PeopleIcon sx={menuIconStyle} />
                </IconButton>
            </Tooltip>
            <Dialog fullScreen={fullScreen}
                    fullWidth
                    maxWidth="sm"
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close">
                            <CloseIcon sx={menuIconStyle} />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Utenti Online
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <OnlineControlDialog closePopup={_ => setOpen(_ => false)} />
                </List>
            </Dialog>
        </Suspense>
    );
}

export default OnlineControl;
