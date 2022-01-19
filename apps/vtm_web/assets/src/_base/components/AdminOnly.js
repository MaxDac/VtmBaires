// @flow

import React from "react";
import {isUserMaster} from "../../services/base-types";
import {useSession} from "../../services/session-service";
import type {GenericReactComponent} from "../types";

export type AdminOnlyProps = {
    children: any;
}

const AdminOnly = ({children}: AdminOnlyProps): GenericReactComponent => {
    const [user,] = useSession();

    const body = (): GenericReactComponent => {
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
