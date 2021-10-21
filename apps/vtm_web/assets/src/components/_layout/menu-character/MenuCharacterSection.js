// @flow

import React from "react";
import {useSession} from "../../../services/session-service";
import {useUserCharactersQuery} from "../../../services/queries/accounts/UserCharactersQuery";
import {isUserMaster} from "../../../services/base-types";
import MenuCharacterSectionForMaster from "./MenuCharacterSectionForMaster";
import MenuCharacterSectionForUser from "./MenuCharacterSectionForUser";

type Props = {
    drawerDone: () => void;
    reloadCount: number;
    onUpdate: () => void;
}

const MenuCharacterSection = ({drawerDone, reloadCount, onUpdate}: Props): any => {
    const [user,] = useSession();
    const characters = useUserCharactersQuery(reloadCount);

    if (characters != null) {
        if (isUserMaster(user)) {
            return <MenuCharacterSectionForMaster drawerDone={drawerDone} 
                                                  characters={characters}
                                                  onUpdate={onUpdate} />
        }
        else {
            return <MenuCharacterSectionForUser drawerDone={drawerDone}
                                                characters={characters}
                                                onUpdate={onUpdate} />
        }
    }

    return (<></>);
}

export default MenuCharacterSection;
