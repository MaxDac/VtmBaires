// @flow

import type {GenericReactComponent} from "../../_base/types";

import {useLocation} from "react-router-dom";

const useIsChatRoute = (): GenericReactComponent => {
    const {pathname} = useLocation();
    return pathname.indexOf("chat") !== -1;
}

export default useIsChatRoute;
