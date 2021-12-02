// @flow

import {useEffect} from "react";
import {useRelayEnvironment} from "react-relay";
import {updateSessionMap} from "../../services/mutations/sessions/UpdateSessionMapMutation";

export const useUpdateSessionMap = (id: string) => {
    const environment = useRelayEnvironment();

    useEffect(() => {
        updateSessionMap(environment, id)
            .catch(e => console.error("Error while updating session map", e));
    }, [environment, id]);
};
