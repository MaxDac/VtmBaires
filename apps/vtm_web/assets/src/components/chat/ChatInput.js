// @flow

import React, {useState} from "react";
import type {DefaultComponentProps} from "../../_base/types";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import "../../fonts/gabriele-l.ttf";
import ChatThrowDiceInput from "./ChatThrowDiceInput";

type ChatInputProps = {
    classes: any;
    newChatEntry: string => void;
}

const ChatInput = ({ classes, newChatEntry }: ChatInputProps): any => {
    const [value, setValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onControlChanged = ({ target: { value: val } }) => {
        setValue(_ => val);
    }

    const openPopup = _ => {
        setIsModalOpen(_ => true);
    }

    const sendInputEntry = () => {
        newChatEntry(value);
        setValue(_ => "");
    }

    return (
        <Grid container>
            <ChatThrowDiceInput isOpen={isModalOpen}
                                onDialogClosing={() => setIsModalOpen(false)}
                                onDialogFormSubmit={e => console.log("received", e)} />
            <Grid item xs={9} sm={10} md={11}>
                <InputBase placeholder="Naked input"
                           multiline
                           rows={4}
                           fullWidth
                           value={value}
                           className={classes.chatInput}
                           inputProps={{ 'aria-label': 'naked' }}
                           onChange={onControlChanged} />
            </Grid>
            <Grid item xs={3} sm={2} md={1} style={{ verticalAlign: "centered" }}>
                <ButtonGroup variant="text"
                             color="secondary"
                             aria-label="vertical contained primary button group"
                             orientation="vertical">
                    <Button onClick={sendInputEntry}>SEND</Button>
                    <Button onClick={openPopup}>THROW</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
};

export default ChatInput;
