// @flow

import React, {useContext} from "react";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HealingIcon from '@mui/icons-material/Healing';
import RoomIcon from '@mui/icons-material/Room';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {useTheme} from "@mui/material/styles";
import {useRelayEnvironment} from "react-relay";
import RouseCheckMutation from "../../../services/mutations/chat/RouseCheckMutation";
import {useSession} from "../../../services/session-service";
import {UtilityContext} from "../../../contexts";
import {handleMutation} from "../../../_base/utils";
import UseWillpowerChatMutation from "../../../services/mutations/chat/UseWillpowerChatMutation";
import HealMutation from "../../../services/mutations/chat/HealMutation";

type Props = {
    openMapModal: () => void;
    openCharacterStatusPopup: () => void;
    mapId: string;
};

const ChatControls = ({openMapModal, openCharacterStatusPopup, mapId}: Props): any => {
    const environment = useRelayEnvironment();
    const theme = useTheme();
    const {openDialog, showUserNotification} = useContext(UtilityContext);
    const [,character] = useSession();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onMapClicked = _ => {
        openMapModal();
        handleClose();
    }

    const requestRouseCheck = _ => {
        openDialog("Vitae", "Sei sicuro di voler spendere vitae?",
            () =>
                handleMutation(() =>
                    RouseCheckMutation(environment, {
                        characterId: character?.id,
                        chatMapId: mapId
                    }), showUserNotification));

        handleClose();
    }

    const requestWillpowerUse = _ => {
        openDialog("Forza di Volontà", "Sei sicuro di voler spendere Forza di Volontà?",
            () =>
                handleMutation(() =>
                    UseWillpowerChatMutation(environment, {
                        characterId: character?.id,
                        chatMapId: mapId
                    }), showUserNotification));

        handleClose();
    }

    const requestHeal = _ =>
        openDialog(
            "Guarire",
            "Sei sicuro di voler spendere vitae per guarire il personaggio?\nRicorda che puoi farlo solo una volta per turno, e il tentativo apparirà in chat.",
            () =>
            handleMutation(
                () => HealMutation(environment, character?.id, mapId),
                showUserNotification
            )
        );

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
                onClick={requestRouseCheck} />
            <SpeedDialAction
                icon={<FlashOnOutlinedIcon />}
                tooltipTitle="Spendi WP"
                tooltipOpen
                onClick={requestWillpowerUse} />
            <SpeedDialAction
                icon={<HealingIcon />}
                tooltipTitle="Guarisci"
                tooltipOpen
                onClick={requestHeal} />
            <SpeedDialAction
                icon={<AssignmentIndIcon />}
                tooltipTitle="Status"
                tooltipOpen
                onClick={_ => openCharacterStatusPopup()} />
        </SpeedDial>
    )
}

export default ChatControls;
