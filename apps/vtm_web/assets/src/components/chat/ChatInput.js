// @flow

import React, {useState} from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import "../../fonts/gabriele-l.ttf";
import ChatThrowDiceInput from "./ChatThrowDiceInput";
import type {ChatDiceRequest} from "./ChatThrowDiceInput";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import CasinoIcon from "@mui/icons-material/Casino";
import SendIcon from "@mui/icons-material/Send";
import {useTheme} from "@mui/material/styles";

type ChatInputProps = {
    newChatEntry: string => void;
    newDiceEntry: ChatDiceRequest => void;
}

const ChatInput = ({ newChatEntry, newDiceEntry }: ChatInputProps): any => {
    const theme = useTheme();
    const [value, setValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inDices, setInDices] = useState(true);

    const onControlChanged = ({ target: { value: val } }) => {
        setValue(_ => val);
    };

    const openPopup = _ => {
        setIsModalOpen(_ => true);
    };

    const sendInputEntry = () => {
        newChatEntry(value);
        setValue(_ => "");
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const floatingButtonStyle = {
        position: 'absolute',
        bottom: theme.spacing(7),
        right: theme.spacing(3)
    };

    return (
        <>
            <ChatThrowDiceInput isOpen={isModalOpen}
                                onDialogClosing={() => setIsModalOpen(false)}
                                onDialogFormSubmit={newDiceEntry} />

            <InputBase placeholder="Write your action here"
                       multiline
                       rows={4}
                       fullWidth
                       value={value}
                       onFocus={_ => setInDices(false)}
                       onBlur={_ => setInDices(true)}
                       sx={{
                           fontFamily: 'GabrieleLightRibbon',
                           padding: "5px",
                           paddingRight: theme.spacing(10),
                           width: "calc(100% - 70px)"
                       }}
                       inputProps={{ 'aria-label': 'naked' }}
                       onChange={onControlChanged} />

            <Box sx={floatingButtonStyle}>
                <Zoom timeout={transitionDuration}
                      in={inDices}
                      sx={{ transitionDelay: transitionDuration.exit }}
                      unmountOnExit>
                    <Fab color="secondary"
                         aria-label="dices"
                         onClick={openPopup}>
                        <CasinoIcon />
                    </Fab>
                </Zoom>
            </Box>
            <Box sx={floatingButtonStyle}>
                <Zoom timeout={transitionDuration}
                      in={!inDices}
                      sx={{ transitionDelay: transitionDuration.exit }}
                      unmountOnExit>
                    <Fab color="secondary"
                         aria-label="send"
                         onClick={sendInputEntry}>
                        <SendIcon />
                    </Fab>
                </Zoom>
            </Box>
        </>
    );
};

export default ChatInput;
