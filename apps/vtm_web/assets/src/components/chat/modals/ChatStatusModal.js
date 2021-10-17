// @flow

import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useFragment} from "react-relay";
import type {CharacterFragments_characterStats$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterStats.graphql";
import {characterStatsFragment} from "../../../services/queries/character/CharacterFragments";
import CharacterSheetStatusStatsSection from "../../sheet/sheet-sections/CharacterSheetStatusStatsSection";
import CharacterFragmentProvider from "../../_data/CharacterFragmentProvider";

type PropsInternal = {
    characterQuery: any;
    close: () => void;
}

type Props = {
    characterId: ?string;
    close: () => void;
}

const ChatStatusModalInternal = ({characterQuery, close}: PropsInternal): any => {
    const sheet: any = useFragment<?CharacterFragments_characterStats$key>(
        characterStatsFragment,
        characterQuery);

    return (
        <>
            <DialogTitle>
                Status
            </DialogTitle>
            <DialogContent>
                <CharacterSheetStatusStatsSection sheet={sheet} />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={_ => close()} color="primary">
                    Close
                </Button>
            </DialogActions>
        </>
    );
}

const ChatStatusModal = (props: Props): any => {
    if (props.characterId != null) {
        return (
            <CharacterFragmentProvider characterId={props.characterId}>
                {character =>
                    <ChatStatusModalInternal characterQuery={character}
                                             close={props.close} />
                }
            </CharacterFragmentProvider>
        );
    }

    return (<></>);
}

export default ChatStatusModal;
