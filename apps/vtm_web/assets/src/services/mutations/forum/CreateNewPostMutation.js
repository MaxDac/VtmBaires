// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {CreateNewPostMutationResponse, CreateNewPostRequest} from "./__generated__/CreateNewPostMutation.graphql";

const mutation = graphql`
    mutation CreateNewPostMutation($request: CreateNewPostRequest!) {
        newForumPost(input: {
            request: $request
        }) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: CreateNewPostRequest): Promise<?string> =>
    wrapMutation<CreateNewPostMutationResponse>(environment, mutation, {request})
        .then(r => r?.newForumPost?.result?.id);

export default mutationPromise;
