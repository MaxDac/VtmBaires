// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";

const mutation = graphql`
    mutation ClearSessionMutation {
        resetSession
    }
`;

const mutationPromise = (environment: IEnvironment): Promise<boolean> => {
    return wrapMutation<boolean>(environment, mutation, {});
}

export default mutationPromise;
