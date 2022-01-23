// @flow

import React from "react";
import type {GenericReactComponent} from "../../../_base/types";
import {useSession} from "../../../services/session-service";
import {isUserMaster} from "../../../services/base-types";
import CharacterSheetComplete from "./CharacterSheetComplete";
import CharacterSheetPublic from "./CharacterSheetPublic";

export type CharacterSheetComponentProps = {
    id?: string;
    reload?: boolean;
    contained?: boolean;
    fetchKey?: number;
}

const CharacterSheetComponent = (props: CharacterSheetComponentProps): GenericReactComponent => {
    const [user, character] = useSession();

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
    else if (character?.id != null) {
        return (<CharacterSheetComplete {...props} id={character.id} />);
    }
    else {
        return (<></>);
    }
};

export default CharacterSheetComponent;
