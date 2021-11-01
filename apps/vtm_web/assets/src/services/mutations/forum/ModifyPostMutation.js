// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {ModifyForumPostInput, ModifyPostMutationResponse} from "./__generated__/ModifyPostMutation.graphql";

const mutation = graphql`
    mutation ModifyPostMutation($request: ModifyForumPostInput!) {
        modifyForumPost(input: $request) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: ModifyForumPostInput): Promise<ModifyPostMutationResponse> => {
    return wrapMutation<ModifyPostMutationResponse>(environment, mutation, {
        request
    });
};

export default mutationPromise;
