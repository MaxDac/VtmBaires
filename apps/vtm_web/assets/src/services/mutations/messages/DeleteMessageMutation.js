// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";

const mutation = graphql`
    mutation DeleteMessageMutation($id: ID!) {
        deleteMessage(messageId: $id) {
            id
        }
    }
`;

const mutationPromise = (id: string): Promise<string> => {
    return wrapMutation<string>(mutation, {id});
}

export default mutationPromise;
