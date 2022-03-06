// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {ModifyForumThreadInput, ModifyThreadMutationResponse} from "./__generated__/ModifyThreadMutation.graphql";

const mutation = graphql`
    mutation ModifyThreadMutation($request: ModifyForumThreadInput!) {
        modifyForumThread(input: $request) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: ModifyForumThreadInput): Promise<ModifyThreadMutationResponse> => {
    return wrapMutation<ModifyThreadMutationResponse>(environment, mutation, {
        request
    });
};

export default mutationPromise;
