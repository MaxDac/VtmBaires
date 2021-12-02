// @flow

import {useLocation} from "react-router-dom";

const useIsChatRoute = (): any => {
    const {pathname} = useLocation();
    return pathname.indexOf("chat") !== -1;
}

export default useIsChatRoute;
