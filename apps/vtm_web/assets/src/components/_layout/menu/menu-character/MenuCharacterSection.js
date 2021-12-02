// @flow

import React from "react";
import {useSession} from "../../../../services/session-service";
import {isUserMaster} from "../../../../services/base-types";
import MenuCharacterSectionForUser from "./MenuCharacterSectionForUser";
import type {UserCharacter} from "../../../../services/queries/accounts/UserCharactersQuery";
import MenuCharacterSelectionForMasterNoUserAllowed from "./MenuCharacterSelectionForMasterNoUserAllowed";

type Props = {
    pushHistory: string => void;
    characters: Array<UserCharacter>;
    onUpdate: () => void;
}

const MenuCharacterSection = ({pushHistory, characters, onUpdate}: Props): any => {
    const [user,] = useSession();

    if (characters != null) {
        if (isUserMaster(user)) {
            return <MenuCharacterSelectionForMasterNoUserAllowed pushHistory={pushHistory} />
        }
        else {
            return <MenuCharacterSectionForUser pushHistory={pushHistory}
                                                characters={characters}
                                                onUpdate={onUpdate} />
        }
    }

    return (<></>);
}

export default MenuCharacterSection;
