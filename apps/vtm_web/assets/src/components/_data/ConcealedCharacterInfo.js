// @flow

import React, {useContext} from "react";
import {useUserCharactersQuery} from "../../services/queries/accounts/UserCharactersQuery";
import {SessionContext} from "../../App";
import {isUserMaster} from "../../services/base-types";

type Props = {
    characterId: ?string;
    children: any;
}

const ConcealedCharacterInfo = ({characterId, children}: Props): any => {
    const user = useContext(SessionContext)?.getUser();
    const userCharacters = useUserCharactersQuery();

    if (isUserMaster(user) || userCharacters.some(({id}) => id === characterId)) {
        return (
            <>
                {children}
            </>
        );
    }

    return (<></>);
}

export default ConcealedCharacterInfo;
