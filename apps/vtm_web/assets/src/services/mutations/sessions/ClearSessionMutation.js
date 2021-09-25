// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";

const mutation = graphql`
    mutation ClearSessionMutation {
        resetSession
    }
`;

const mutationPromise = (): Promise<boolean> => {
    return wrapMutation<boolean>(mutation, {});
}

export default mutationPromise;
