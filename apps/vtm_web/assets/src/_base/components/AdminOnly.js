// @flow

import React from "react";
import type {GenericReactComponent} from "../types";
import {useRecoilValue} from "recoil";
import {isUserMasterSelector} from "../../session/selectors";

export type AdminOnlyProps = {
    children: any;
}

const AdminOnly = ({children}: AdminOnlyProps): GenericReactComponent => {
    const isUserMaster = useRecoilValue(isUserMasterSelector)

    const body = (): GenericReactComponent => {
        if (isUserMaster) {
            return (<>{children}</>);
        }
        else {
            return (<></>);
        }
    }

    return body();
}

export default AdminOnly;
