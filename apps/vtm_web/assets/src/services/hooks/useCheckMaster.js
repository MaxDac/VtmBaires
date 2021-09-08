// @flow

import {isMaster as checkIfMaster} from "../session-service";
import {useMemo, useState} from "react";

const useCheckMaster = (): any => {
    const [isMaster, setIsMaster] = useState<boolean>(false);

    useMemo(() => {
        checkIfMaster()
            .then(result => setIsMaster(result))
            .catch(_ => setIsMaster(false));
    }, []);

    return isMaster;
};

export default useCheckMaster;
