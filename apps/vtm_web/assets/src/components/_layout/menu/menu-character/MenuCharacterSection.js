// @flow

import React from "react";
import MenuCharacterSectionForUser from "./MenuCharacterSectionForUser";
import MenuCharacterSelectionForMasterNoUserAllowed from "./MenuCharacterSelectionForMasterNoUserAllowed";
import type {GenericReactComponent} from "../../../../_base/types";
import {useRecoilValue} from "recoil";
import {isUserMasterSelector} from "../../../../session/selectors";

type Props = {
    pushHistory: string => void;
    reloadCount: number;
    onUpdate: () => void;
}

const MenuCharacterSection = ({pushHistory, reloadCount, onUpdate}: Props): GenericReactComponent => {
    const isUserMaster = useRecoilValue(isUserMasterSelector)

    if (isUserMaster) {
        return (<MenuCharacterSelectionForMasterNoUserAllowed pushHistory={pushHistory} />);
    }

    return (<MenuCharacterSectionForUser pushHistory={pushHistory}
                                        reloadCount={reloadCount}
                                        onUpdate={onUpdate} />);
}

export default MenuCharacterSection;
