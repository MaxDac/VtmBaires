// @flow

import React from "react";
import type {GenericReactComponent} from "../../../../_base/types";
import Avatar from "@mui/material/Avatar";
import type {ForumAvatarProps} from "./ForumPostOnGame";

const ForumNoAvatar = ({containerStyle}: ForumAvatarProps): GenericReactComponent => {
    return (
        <td style={containerStyle}>
            <Avatar style={{width: "100px", height: "100px"}} />
        </td>
    );
};

export default ForumNoAvatar;
