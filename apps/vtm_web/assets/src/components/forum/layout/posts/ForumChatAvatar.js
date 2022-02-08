// @flow

import React from "react";
import type {GenericReactComponent} from "../../../../_base/types";
import {useCustomLazyLoadQuery} from "../../../../_base/relay-utils";
import {getCharacterChatAvatarQuery} from "../../../../services/queries/character/GetCharacterChatAvatarQuery";
import Avatar from "@mui/material/Avatar";
import type {ForumAvatarProps} from "./ForumPostOnGame";

type Props = ForumAvatarProps & {
    characterId: string;
    characterName?: ?string;
}

const ForumChatAvatar = ({characterId, characterName, containerStyle}: Props): GenericReactComponent => {
    const avatar = useCustomLazyLoadQuery(getCharacterChatAvatarQuery, {
        characterId: characterId
    }, {
        fetchPolicy: "store-or-network"
    })?.getCharacterChatAvatar?.chatAvatar;

    return (
        <td style={containerStyle}>
            <Avatar src={avatar}
                    sx={{width: "50px", height: "50px"}}
                    alt={`${characterName ?? ""} Avatar`} />
        </td>
    );
};

export default ForumChatAvatar;
