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

const fetchGraphQL = ({ text }: RequestParameters, variables: Variables) => 
    fetch("/api", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: text,
            variables
        })
    })
    .then(r => r.json());

const environment: Environment = new Environment({
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource())
});

export default environment;
