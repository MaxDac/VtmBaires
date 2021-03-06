// @flow

import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import CharacterSheetPublic from "./CharacterSheetPublic";
import CharacterSheetComplete from "./CharacterSheetComplete";
import type {GenericReactComponent} from "../../_base/types";
import {useRecoilValue} from "recoil";
import {useCharacterRecoilState} from "../../session/hooks";
import {isUserMasterSelector} from "../../session/selectors";

type Props = {
    id?: string;
    reload?: boolean;
    contained?: boolean;
    fetchKey?: number;
}

export const CharacterSheetSuspenseFallback = (): GenericReactComponent => {
    return (
        <>
            <Box component="div" style={{textAlign: "center"}}>
                <Skeleton variant="text" height={20} width={40} />
            </Box>
            
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rect" width={210} height={118} />
        </>
    );
}

const CharacterSheet = (props: Props): GenericReactComponent => {
    const isUserMaster = useRecoilValue(isUserMasterSelector)
    const [character,] = useCharacterRecoilState()

    const characterOfUser = () =>
        character?.id != null &&
        props.id != null &&
        character.id === props.id;

    if (isUserMaster || characterOfUser()) {
        return (<CharacterSheetComplete {...props} />);
    }
    else if (props.id != null) {
        return (<CharacterSheetPublic id={props.id} {...props} />);
    }
    else if (character?.id != null) {
        return (<CharacterSheetComplete {...props} id={character.id} />);
    }
    else {
        return (<></>);
    }
}

export default CharacterSheet;
