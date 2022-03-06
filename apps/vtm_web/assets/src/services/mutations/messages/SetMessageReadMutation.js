// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";

const mutation = graphql`
    mutation SetMessageReadMutation($id: ID!) {
        setMessageRead(messageId: $id) {
            id
        }
    }
`;

const mutationPromise = (environment: IEnvironment, id: string): Promise<string> => {
    return wrapMutation<string>(environment, mutation, {
        id
    });
}

export default mutationPromise;
