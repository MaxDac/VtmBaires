// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {DeletePostMutationResponse} from "./__generated__/DeletePostMutation.graphql";

const mutation = graphql`
    mutation DeletePostMutation($postId: ID!) {
        deleteForumPost(input: {
            postId: $postId 
        }) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, postId: string): Promise<DeletePostMutationResponse> => {
    return wrapMutation<DeletePostMutationResponse>(environment, mutation, {
        postId
    });
};

export default mutationPromise;
