// @flow

import {
    Environment,
    Network,
    RecordSource,
    Store
} from "relay-runtime";

import RelayQueryResponseCache from 'relay-runtime/lib/network/RelayQueryResponseCache';

import type { 
    RequestParameters,
    Variables
} from "relay-runtime";
import {post} from "axios";
import {useNavigate} from "react-router-dom";
import {log} from "./utils";
import {AppRoutes} from "../AppRouter";

export const cache: any = new RelayQueryResponseCache({
    size: 250,
    ttl: 60 * 5 * 1000
});

const fetchGraphQL = navigate => {
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
                navigate(AppRoutes.sessionExpired);
            }

            return e.response.data;
        }
    };
};

export const getEnvironment = (navigate: string => void): Environment => {
    return new Environment({
        network: Network.create(fetchGraphQL(navigate)),
        store: new Store(new RecordSource())
    });
}

export const useEnv = (): Environment => {
    const navigate = useNavigate();
    return getEnvironment(navigate);
};
