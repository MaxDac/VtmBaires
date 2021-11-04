// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {DeleteAllReceivedMessagesMutationResponse} from "./__generated__/DeleteAllReceivedMessagesMutation.graphql";

const mutation = graphql`
    mutation DeleteAllReceivedMessagesMutation {
        deleteAllReceivedMessage
    }
`;

const mutationPromise = (environment: IEnvironment): Promise<DeleteAllReceivedMessagesMutationResponse> => {
    return wrapMutation<DeleteAllReceivedMessagesMutationResponse>(environment, mutation, {});
}

export default mutationPromise;
