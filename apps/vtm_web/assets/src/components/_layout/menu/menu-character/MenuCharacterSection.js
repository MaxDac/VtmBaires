// @flow

import React from "react";
import {useSession} from "../../../../services/session-service";
import {isUserMaster} from "../../../../services/base-types";
import MenuCharacterSectionForUser from "./MenuCharacterSectionForUser";
import MenuCharacterSelectionForMasterNoUserAllowed from "./MenuCharacterSelectionForMasterNoUserAllowed";

type Props = {
    pushHistory: string => void;
    reloadCount: number;
    onUpdate: () => void;
}

const MenuCharacterSection = ({pushHistory, reloadCount, onUpdate}: Props): any => {
    const [user,] = useSession();

    if (isUserMaster(user)) {
        return (<MenuCharacterSelectionForMasterNoUserAllowed pushHistory={pushHistory} />);
    }

    return (<MenuCharacterSectionForUser pushHistory={pushHistory}
                                        reloadCount={reloadCount}
                                        onUpdate={onUpdate} />);
}

export default MenuCharacterSection;