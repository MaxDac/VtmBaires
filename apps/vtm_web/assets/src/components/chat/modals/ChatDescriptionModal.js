// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {getCharacterDescriptionQuery} from "../../../services/queries/character/GetCharacterDescriptionQuery";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import type {GenericReactComponent} from "../../../_base/types";

type PropsInternal = {
    characterId: string;
    close: () => void;
}

type Props = {
    characterId: ?string;
    close: () => void;
}

const ChatDescriptionModalInternal = ({characterId, close}: PropsInternal): GenericReactComponent => {
    const characterInfo =
        useCustomLazyLoadQuery(getCharacterDescriptionQuery, {id: characterId})
            ?.getCharacterDescription;

    const chatAvatar = () => {
        if (characterInfo?.avatar != null) {
            return (
                <img src={characterInfo.avatar}
                     align="left"
                     alt="avatar"
                     hspace="10px"
                     vspace="10px"
                     style={{
                         maxWidth: "200px",
                         maxHeight: "300px",
                         height: "auto"
                     }} />
            );
        }

        return (<></>);
    }

    return (
        <>
            <DialogTitle>
                {characterInfo?.name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {chatAvatar()}
                    {characterInfo?.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={_ => close()} color="primary">
                    Chiudi
                </Button>
            </DialogActions>
        </>
    );
}

const ChatDescriptionModal = (props: Props): GenericReactComponent => {
    if (props.characterId != null) {
        return (<ChatDescriptionModalInternal characterId={props.characterId} close={props.close} />);
    }

    return (<></>);
}

export default ChatDescriptionModal;
