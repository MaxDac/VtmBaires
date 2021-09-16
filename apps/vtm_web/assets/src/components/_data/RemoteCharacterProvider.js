// @flow

import React from "react";
import {useFetchCharacterIfOne} from "../../services/session-service";
import Typography from "@material-ui/core/Typography";

type Props = {
    children: string => any,
}

const RemoteCharacterProvider = (props: Props): any => {
    const [response, character] = useFetchCharacterIfOne();

    if ((response === "OnlyOne" || response === "MoreThanOne") && character?.id != null) {
        return props.children(character.id);
    }

    return (
        <Typography>
            You must create a character to view the sheet.
        </Typography>
    )
}

export default RemoteCharacterProvider;
