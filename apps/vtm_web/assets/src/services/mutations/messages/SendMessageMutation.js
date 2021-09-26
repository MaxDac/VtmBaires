// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {SendMessageRequest} from "./__generated__/SendMessageMutation.graphql";

const mutation = graphql`
    mutation SendMessageMutation($request: SendMessageRequest!) {
        sendMessage(message: $request) {
            id
        }
    }
`;

const mutationPromise = (request: SendMessageRequest): Promise<string> => {
    return wrapMutation<string>(mutation, request);
}

export default mutationPromise;
