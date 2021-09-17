// @flow

import {
    Environment,
    Network,
    RecordSource,
    Store
} from "relay-runtime";

import type { 
    RequestParameters,
    Variables
} from "relay-runtime";
import {post} from "axios";
import {useHistory} from "react-router-dom";
import {log} from "./utils";
import {Routes} from "../AppRouter";

const fetchGraphQL = history => {
    return async ({text}: RequestParameters, variables: Variables) => {
        try {
            const response = await post("/api", {
                query: text,
                variables
            });

            return response.data;
        } catch (e) {
            if (e.response.status === 401) {
                log("Unauthorized", e.response.data, "error");
                history.push(Routes.login);
            }

            return e.response.data;
        }
    };
};
    // fetch("/api", {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         query: text,
    //         variables
    //     })
    // }).then(r => r.json());

// const environment: Environment = new Environment({
//     network: Network.create(fetchGraphQL),
//     store: new Store(new RecordSource())
// });
//
// export default environment;

export const getEnvironment = (history: any): Environment => {
    return new Environment({
        network: Network.create(fetchGraphQL(history)),
        store: new Store(new RecordSource())
    });
}

export const useEnv = (): Environment => {
    const history = useHistory();
    return getEnvironment(history);
};
