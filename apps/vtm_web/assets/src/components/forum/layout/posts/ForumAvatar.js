// @flow

import React from "react";
import type {GenericReactComponent} from "../../../../_base/types";
import {useCustomLazyLoadQuery} from "../../../../_base/relay-utils";
import Avatar from "@mui/material/Avatar";
import {getCharacterAvatarQuery} from "../../../../services/queries/character/GetCharacterAvatarQuery";
import type {ForumAvatarProps} from "./ForumPostOnGame";

type Props = ForumAvatarProps & {
    characterId: string;
    characterName?: ?string;
};

const ForumAvatar = ({characterId, characterName, containerStyle}: Props): GenericReactComponent => {
    const avatar = useCustomLazyLoadQuery(getCharacterAvatarQuery, { id: characterId }, {
        fetchPolicy: "store-or-network"
    })?.getCharacterAvatar?.avatar;

    return (
        <td style={containerStyle}>
            <Avatar style={{width: "100px", height: "100px"}}
                    src={avatar}
                    alt={`${characterName ?? ""} Avatar`} />
        </td>
    );
};

export default ForumAvatar;
