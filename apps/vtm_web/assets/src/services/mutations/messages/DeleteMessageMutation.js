// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import {IEnvironment} from "relay-runtime";

const mutation = graphql`
    mutation DeleteMessageMutation($id: ID!) {
        deleteMessage(messageId: $id) {
            id
        }
    }
`;

const mutationPromise = (environment: IEnvironment, id: string): Promise<string> => {
    return wrapMutation<string>(environment, mutation, {id});
}

export default mutationPromise;
