// @flow

import React from "react";
import {useUserCharactersQuery} from "../../services/queries/accounts/UserCharactersQuery";
import {isUserMaster} from "../../services/base-types";
import {useSession} from "../../services/session-service";

type Props = {
    characterId: ?string;
    children: any;
}

const ConcealedCharacterInfo = ({characterId, children}: Props): any => {
    const [user,] = useSession();
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
