// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetCharacterChatAvatarQuery} from "../../../services/queries/character/__generated__/GetCharacterChatAvatarQuery.graphql";
import {getCharacterChatAvatarQuery} from "../../../services/queries/character/GetCharacterChatAvatarQuery";
import Avatar from "@mui/material/Avatar";
import type {GenericReactComponent} from "../../../_base/types";

type Props = {
    characterId: string;
    avatarStyle: any;
}

const ReadMessageAvatar = ({characterId, avatarStyle}: Props): GenericReactComponent => {
    const chatAvatar = useCustomLazyLoadQuery<GetCharacterChatAvatarQuery>(getCharacterChatAvatarQuery, {
        characterId: characterId
    }, {
        fetchPolicy: "store-or-network"
    })?.getCharacterChatAvatar?.chatAvatar;

    return (
        <Avatar alt="character-avatar" src={chatAvatar} sx={avatarStyle} />
    );
}

export default ReadMessageAvatar;
