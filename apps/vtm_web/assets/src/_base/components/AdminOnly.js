// @flow

import React from "react";
import {isUserMaster} from "../../services/base-types";
import {useSession} from "../../services/session-service";

export type AdminOnlyProps = {
    children: any;
}

const AdminOnly = ({children}: AdminOnlyProps): any => {
    const [user,] = useSession();

    const body = (): any => {
        if (isUserMaster(user)) {
            return (<>{children}</>);
        }
        else {
            return (<></>);
        }
    }

    return body();
}

export default AdminOnly;
