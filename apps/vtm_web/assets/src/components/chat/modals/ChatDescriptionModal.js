// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetCharacterDescriptionQuery} from "../../../services/queries/character/__generated__/GetCharacterDescriptionQuery.graphql";
import {getCharacterDescriptionQuery} from "../../../services/queries/character/GetCharacterDescriptionQuery";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type PropsInternal = {
    characterId: string;
    close: () => void;
}

type Props = {
    characterId: ?string;
    close: () => void;
}

const ChatDescriptionModalInternal = ({characterId, close}: PropsInternal): any => {
    const characterInfo =
        useCustomLazyLoadQuery<GetCharacterDescriptionQuery>(getCharacterDescriptionQuery, {id: characterId})
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

const ChatDescriptionModal = (props: Props): any => {
    if (props.characterId != null) {
        return (<ChatDescriptionModalInternal characterId={props.characterId} close={props.close} />);
    }

    return (<></>);
}

export default ChatDescriptionModal;