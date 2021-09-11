// @flow

import {commitMutation, fetchQuery, requestSubscription} from "react-relay";
import environment from "../_base/relay-environment";
import subscriptionEnvironment from "../_base/relay-socket-environment";
import {getLoginInformation} from "./session-service";
import {Observable} from "relay-runtime";

import type {Sink} from "relay-runtime/network/RelayObservable";
import type { PayloadError } from "relay-runtime";
import type {Subscription} from "relay-runtime/network/RelayObservable";

export type BackEndError = {
    errors: Array<string>;
}

export type GraphqlErrorLocation = {
    column: number;
    line: number;
}

export type GraphqlError = {
    locations: GraphqlErrorLocation[];
    message: string;
    path: string[];
}

export type GraphqlErrorMessage = {
    errors: GraphqlError[];
}

export function parseGraphqlMessage(error: GraphqlErrorMessage): string {
    if (error && error.errors) {
        return error?.errors
            .map(({ message }) => message)
            .join("\r\n");
    }

    return "An error happened in the back end";
}

function parseResponse<T>(res: T => void, rej: any => void, extractor?: any => T) {
    return (response: any, errors: ?Array<PayloadError>) => {
        if (errors) { 
            rej({
                errors: errors
            });
        }
        else if (response) {
            if (extractor) {
                res(extractor(response));
            }
            else {
                res(response);
            }
        }
    };
}

export function wrapQuery<T>(operation: any, variables: any, extractor?: any => T): Promise<T> {
    return new Promise((res, rej) => {
        fetchQuery(
            environment,
            operation,
            variables
        )
        .subscribe({
            next: response => {
                parseResponse(res, rej, extractor)(response);
            },
            error: _ => {
                rej([ `There was an error while contacting the server.\r\nPlease check your connection.` ]);
            }
        })
    });
}

export function wrapQueryAuthorized<T>(operation: any, variables: any, extractor?: any => T): Promise<T> {
    return getLoginInformation()
        .then(_ => wrapQuery(operation, variables, extractor));
}

export function wrapMutation<T>(operation: any, variables: any, extractor?: any => T): Promise<T> {
    return new Promise((res, rej) => {
        commitMutation(
            environment,
            {
                mutation: operation,
                variables,
                onCompleted: parseResponse(res, rej, extractor),
                onError: _ =>
                    rej([ `There was an error while contacting the server.\r\nPlease check your connection.` ])
            }
        )
    });
}

export function wrapMutationAuthorized<T>(operation: any, variables: any, extractor?: any => T): Promise<T> {
    return getLoginInformation()
        .then(_ => wrapMutation(operation, variables, extractor));
}

const request = <T>(sink: Sink<T>, operation: any, variables: any, extractor?: any => T) => {
    requestSubscription(
        subscriptionEnvironment,
        {
            subscription: operation,
            variables,
            onCompleted: () => {
                sink.complete();
            },
            onError: error => {
                console.error("Error in subscription");
                sink.error(error, true);
            },
            onNext: object => {
                parseResponse(
                    sink.next,
                    sink.error,
                    extractor
                )(object);
            }
        }
    );
};

export function wrapSubscription<T>(operation: any, variables: any, extractor?: any => T): Observable<T> {
    return Observable.create((sink: Sink<T>) => request(sink, operation, variables, extractor));
}

export function wrapSubscriptionAuthorized<T>(operation: any, variables: any, extractor?: any => T): Observable<T> {
    return Observable.create(sink => {
        getLoginInformation()
            .then(_ => request(sink, operation, variables, extractor));
    })
}

/**
 * Subscribes to the given observable.
 * @param observable The Observable.
 * @param onNext The next value handler.
 * @param onError The error handler.
 * @returns {Subscription} The subscription info.
 */
export const subscribe = <T>(observable: Observable<T>, onNext: T => void, onError?: ((any, ?boolean) => void)): Subscription => {
    const handleError = onError ?? ((e, _) => console.error("Error in subscription!", e));

    const subscription = observable.subscribe({
        next: onNext,
        error: handleError,
        complete: () => subscription.unsubscribe(),
        closed: false
    });

    return subscription;
};
