// @flow

import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import CharacterSheet from "../../sheet/CharacterSheet";
import Box from "@mui/material/Box";
import {useSession} from "../../../services/session-service";

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

    if (user.role !== "MASTER") {
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
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            {characterName}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{
                    overflow: "auto"
                }}>
                    <CharacterSheet contained={true}
                                    id={characterId}
                                    reload={true}/>
                </Box>
            </>
        );
    }
}

const ChatMasterModal = (props: Props) => {
    if (props.characterId != null) {
        return (<ChatMasterModalInternal {...props} />);
    }

    return (<></>);
}

export default ChatMasterModal;
