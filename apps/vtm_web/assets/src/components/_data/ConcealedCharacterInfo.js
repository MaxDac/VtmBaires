// @flow

import React from "react";
import {useUserCharactersQuery} from "../../services/queries/accounts/UserCharactersQuery";
import type {GenericReactComponent} from "../../_base/types";
import {useRecoilValue} from "recoil";
import {isUserMasterSelector} from "../../session/selectors";

type Props = {
    characterId: ?string;
    children: any;
}

const ConcealedCharacterInfo = ({characterId, children}: Props): GenericReactComponent => {
    const isUserMaster = useRecoilValue(isUserMasterSelector)
    const userCharacters = useUserCharactersQuery();

    if (isUserMaster || userCharacters.some(({id}) => id === characterId)) {
        return (
            <>
                {children}
            </>
        );
    }

    return (<></>);
}

export default ConcealedCharacterInfo;
