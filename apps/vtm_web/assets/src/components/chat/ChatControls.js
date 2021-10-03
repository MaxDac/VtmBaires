// @flow

import React from "react";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import RoomIcon from '@mui/icons-material/Room';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import {useTheme} from "@mui/material/styles";

type Props = {
    openMapModal: () => void;
};

const ChatControls = ({openMapModal}: Props): any => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onMapClicked = _ => {
        openMapModal();
        handleClose();
    }

    return (
        <SpeedDial
            ariaLabel="Azioni chat"
            sx={{
                position: 'absolute',
                top: theme.spacing(10),
                right: theme.spacing(3)
            }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            direction="down"
            open={open}>
            <SpeedDialAction
                icon={<RoomIcon />}
                tooltipTitle="Location"
                tooltipOpen
                onClick={onMapClicked} />
            <SpeedDialAction
                icon={<BloodtypeIcon />}
                tooltipTitle="Spendi vitae"
                tooltipOpen
                onClick={handleClose} />
            <SpeedDialAction
                icon={<FlashOnOutlinedIcon />}
                tooltipTitle="Spendi WP"
                tooltipOpen
                onClick={handleClose} />
        </SpeedDial>
    )
}

export default ChatControls;
