// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {
    CreateNewThreadMutationResponse,
    CreateNewThreadRequest
} from "./__generated__/CreateNewThreadMutation.graphql";
import type {IEnvironment} from "relay-runtime";

const mutation = graphql`
    mutation CreateNewThreadMutation($request: CreateNewThreadRequest!) {
        newForumThread(input: {
            request: $request
        }) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: CreateNewThreadRequest): Promise<?string> =>
    wrapMutation<CreateNewThreadMutationResponse>(environment, mutation, {request})
        .then(x => x?.newForumThread?.result?.id);

export default mutationPromise;
