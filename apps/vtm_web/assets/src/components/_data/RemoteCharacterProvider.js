// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {useUserCharactersQuery} from "../../services/queries/accounts/UserCharactersQuery";

type Props = {
    children: string => any,
}

const RemoteCharacterProvider = (props: Props): any => {
    const characters = useUserCharactersQuery();

    if (characters != null && characters.length > 0) {
        return props.children(characters[0].id);
    }

    return (
        <Typography>
            You must create a character to view the sheet.
        </Typography>
    )
}

export default RemoteCharacterProvider;
