// @flow

import React, {useState} from "react";
import InputBase from "@mui/material/InputBase";
import ChatThrowDiceInput from "./ChatThrowDiceInput";
import type {ChatDiceRequest} from "./ChatThrowDiceInput";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import CasinoIcon from "@mui/icons-material/Casino";
import SendIcon from "@mui/icons-material/Send";
import {useTheme} from "@mui/material/styles";
import {Typography} from "@mui/material";

type ChatInputProps = {
    newChatEntry: string => void;
    newDiceEntry: ChatDiceRequest => void;
}

const ChatInput = ({ newChatEntry, newDiceEntry }: ChatInputProps): any => {
    const theme = useTheme();
    const [value, setValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inDices, setInDices] = useState(true);
    const [charactersCount, setCharactersCount] = useState(0);
    const [shiftPressed, setShiftPressed] = useState(false);

    // TODO - set the dimensions of the thing based on the dimension of the screen
    const textboxRows = 4; // isSmall ? 2 : 4;
    const maxCharacters = 500;

    const onControlChanged = ({ target: { value: val } }) => {
        setValue(_ => val);
    };

    const handleControlKeyDown = ({key}) => {
        if (key === "Shift") {
            setShiftPressed(_ => true);
        }
        else if (key === "Enter") {
            if (shiftPressed) {
                setShiftPressed(_ => false);
                sendInputEntry();
            }
        }
    };

    const handleCntrolKeyUp = ({key, target: {value}}) => {
        if (key === "Shift") {
            setShiftPressed(_ => false);
        }

        setCharactersCount(_ => (value: string).length);
    };

    const openPopup = _ => {
        setIsModalOpen(_ => true);
    };

    const sendInputEntry = () => {
        newChatEntry(value.substring(0, maxCharacters));
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

    const countCharacterMessage = () => {
        if (charactersCount > maxCharacters) {
            return "Numero di caratteri utilizzati eccessivo. La frase sarà tagliata a 500 caratteri.";
        }

        return `Numero di caratteri rimanenti: ${maxCharacters - charactersCount}`;
    }

    return (
        <>
            <ChatThrowDiceInput isOpen={isModalOpen}
                                onDialogClosing={() => setIsModalOpen(false)}
                                onDialogFormSubmit={newDiceEntry} />

            <Box>
                <InputBase placeholder="Scrivi qui la tua azione"
                        multiline
                        rows={textboxRows}
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
                        onKeyDown={handleControlKeyDown}
                        onKeyUp={handleCntrolKeyUp}
                        onChange={onControlChanged} />
                <Typography sx={{
                    fontSize: "13px"
                }}>
                    {countCharacterMessage()}
                </Typography>
            </Box>

            <Box sx={floatingButtonStyle}>
                <Zoom timeout={transitionDuration}
                      in={inDices}
                      sx={{ transitionDelay: transitionDuration.exit }}
                      unmountOnExit>
                    <Fab color="primary"
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
                    <Fab color="primary"
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
