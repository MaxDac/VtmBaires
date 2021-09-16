// @flow

import React, {useContext} from "react";
import {SessionContext} from "../../App";
import {isUserMaster} from "../../services/base-types";

export type AdminOnlyProps = {
    children: any;
}

const AdminOnly = ({children}: AdminOnlyProps): any => {
    const {
        getUser
    } = useContext(SessionContext);

    const body = (): any => {
        if (isUserMaster(getUser?.())) {
            return (<>{children}</>);
        }
        else {
            return (<></>);
        }
    }

    return body();
}

export default AdminOnly;
