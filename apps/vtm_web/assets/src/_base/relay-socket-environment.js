// @flow

import {
    Environment,
    Network,
    RecordSource,
    Store,
    Observable
} from "relay-runtime";

import * as AbsintheSocket from "@absinthe/socket";
import { createFetcher, createSubscriber } from "@absinthe/socket-relay";

// $FlowFixMe
import { Socket as PhoenixSocket } from "phoenix";

import type {
    RequestParameters,
    Variables,
    CacheConfig
} from "relay-runtime";

const buildWebSocketUrl = () => {
    const prefix = process.env.NODE_ENV === "development" ? "ws" : "wss";
    return `${prefix}://${window.document.location.host}/socket`;
};

const absintheSocket = AbsintheSocket.create(
    new PhoenixSocket(buildWebSocketUrl())
);

const legacySubscriber = createSubscriber(absintheSocket);

// @absinthe/socket-relay is outdated so wrap it with a fix
const subscribe = (request: RequestParameters, variables: Variables, cacheConfig: CacheConfig) =>
    Observable.create(sink => {
        // This function must not return any value, that's why it's wrapped in curly braces.
        legacySubscriber(request, variables, cacheConfig, {
            onNext: sink.next,
            onError: sink.error,
            onCompleted: sink.complete
        });
    });

const socketEnvironment: Environment = new Environment({
    network: Network.create(
        createFetcher(absintheSocket),
        subscribe
    ),
    store: new Store(new RecordSource())
});

export default socketEnvironment;
