// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {
    CreateNewNpcMutationResponse
} from "./__generated__/CreateNewNpcMutation.graphql";
import {CharacterCreationRequest} from "./__generated__/CreateNewNpcMutation.graphql";

const mutation = graphql`
    mutation CreateNewNpcMutation($request: CharacterCreationRequest!) {
        createNpc(request: $request) {
            id
            name
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: CharacterCreationRequest): Promise<CreateNewNpcMutationResponse> => {
    return wrapMutation<CreateNewNpcMutationResponse>(environment, mutation, {
        request: {
            ...request,
            clanId: request.clanId
        }
    });
};

export default mutationPromise;
