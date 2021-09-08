// @flow

import React from "react";
import useCheckMaster from "../../services/hooks/useCheckMaster";

export type AdminOnlyProps = {
    children: any;
}

const AdminOnly = ({children}: AdminOnlyProps): any => {
    const isMaster = useCheckMaster();

    const body = (): any => {
        if (isMaster) {
            return (<>{children}</>);
        }
        else {
            return (<></>);
        }
    }

    return body();
}

export default AdminOnly;
