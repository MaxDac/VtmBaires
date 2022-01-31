// @flow

import React from "react";
import type {GenericReactComponent} from "../../../../_base/types";
import Avatar from "@mui/material/Avatar";

const ForumNoAvatar = (): GenericReactComponent => {
    return (
        <td style={{width: "120px"}}>
            <Avatar style={{width: "100px", height: "100px"}} />
        </td>
    );
};

export default ForumNoAvatar;
