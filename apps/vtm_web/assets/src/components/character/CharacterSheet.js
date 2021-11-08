// @flow

import React from "react";
import Skeleton from "@mui/material/Skeleton";
import {useSession} from "../../services/session-service";
import {isUserMaster} from "../../services/base-types";
import CharacterSheetPublic from "./CharacterSheetPublic";
import CharacterSheetComplete from "./CharacterSheetComplete";

type Props = {
    id?: string;
    reload?: boolean;
    contained?: boolean;
    fetchKey?: number;
}

export const CharacterSheetSuspenseFallback = (): any => {
    return (
        <>
            <Skeleton variant="text" />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={210} height={118} />
        </>
    );
}

const CharacterSheet = (props: Props): any => {
    const [user,character] = useSession();

    const characterOfUser = () =>
        character?.id != null &&
        props.id != null &&
        character.id === props.id;

    if (isUserMaster(user) || characterOfUser()) {
        return (<CharacterSheetComplete {...props} />);
    }
    else if (props.id != null) {
        return (<CharacterSheetPublic id={props.id} {...props} />);
    }
    else {
        return (<></>);
    }
}

export default CharacterSheet;
