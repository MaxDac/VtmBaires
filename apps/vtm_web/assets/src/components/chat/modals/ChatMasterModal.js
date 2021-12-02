// @flow

import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import {useSession} from "../../../services/session-service";
import CharacterChatDashboard from "../../admin/characters/CharacterChatDashboard";
import {menuIconStyle} from "../../_layout/menu/menu-base-utils";

type InternalProps = {
    mapId: string;
    characterId: string;
    characterName: string;
    closeModal: () => void;
}

type Props = {
    mapId: string;
    characterId?: string;
    characterName?: string;
    closeModal: () => void;
}

const ChatMasterModalInternal = ({mapId, characterId, characterName, closeModal}: InternalProps): any => {
    const [user,] = useSession();

    if (user?.role !== "MASTER") {
        return (<></>);
    }
    else {
        return (
            <>
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton edge="start"
                                    color="inherit"
                                    onClick={_ => closeModal()}
                                    aria-label="close">
                            <CloseIcon sx={menuIconStyle} />
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            {characterName}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{
                    overflow: "auto"
                }}>
                    <CharacterChatDashboard characterId={characterId} />
                </Box>
            </>
        );
    }
}

const ChatMasterModal = (props: Props): any => {
    if (props.characterId != null && props.characterName != null) {
        const newProps = {
            ...props,
            characterId: (props.characterId: string),
            characterName: (props.characterName: string)
        }
        return (<ChatMasterModalInternal {...newProps} />);
    }

    return (<></>);
}

export default ChatMasterModal;
