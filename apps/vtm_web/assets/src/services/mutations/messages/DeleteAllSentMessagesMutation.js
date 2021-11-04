// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {DeleteAllSentMessagesMutationResponse} from "./__generated__/DeleteAllSentMessagesMutation.graphql";

const mutation = graphql`
    mutation DeleteAllSentMessagesMutation {
        deleteAllSentMessage
    }
`;

const mutationPromise = (environment: IEnvironment): Promise<DeleteAllSentMessagesMutationResponse> => {
    return wrapMutation<DeleteAllSentMessagesMutationResponse>(environment, mutation, );
}

export default mutationPromise;
