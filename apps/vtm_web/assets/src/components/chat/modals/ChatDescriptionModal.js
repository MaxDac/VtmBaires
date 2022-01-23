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

    return (
        <>
            <DialogTitle>
                {characterInfo?.name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {characterInfo?.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={_ => close()} color="primary">
                    Close
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
