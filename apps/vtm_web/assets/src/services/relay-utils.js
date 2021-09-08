// @flow

import { commitMutation, fetchQuery } from "react-relay";
import environment from "../_base/relay-environment";

import type {
    PayloadError
} from "relay-runtime";
import {getLoginInformation} from "./session-service";

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
    return (response: any,  errors: ?Array<PayloadError>) => {
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
            error: error => {
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
                onError: error => 
                    rej([ `There was an error while contacting the server.\r\nPlease check your connection.` ])
            }
        )
    });
}

export function wrapMutationAuthorized<T>(operation: any, variables: any, extractor?: any => T): Promise<T> {
    return getLoginInformation()
        .then(_ => wrapMutation(operation, variables, extractor));
}
