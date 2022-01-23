// @flow

import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useFragment} from "react-relay";
import type {CharacterFragments_characterStats$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterStats.graphql";
import {characterStatsFragment} from "../../../services/queries/character/CharacterFragments";
import CharacterSheetStatusStatsSection from "../../character/sheet-sections/sections/CharacterSheetStatusStatsSection";
import CharacterFragmentProvider from "../../_data/CharacterFragmentProvider";
import type {GenericReactComponent} from "../../../_base/types";

type PropsInternal = {
    characterQuery: CharacterFragments_characterStats$key;
    close: () => void;
}

type Props = {
    characterId: ?string;
    close: () => void;
}

const ChatStatusModalInternal = ({characterQuery, close}: PropsInternal): GenericReactComponent => {
    const sheet: any = useFragment(
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

const ChatStatusModal = (props: Props): GenericReactComponent => {
    if (props.characterId != null) {
        return (
            <CharacterFragmentProvider characterId={props.characterId}
                                       showWarningWhenNoCharacterSelected={true}>
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
