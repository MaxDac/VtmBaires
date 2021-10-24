// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {
    CreateNewNpcMutationResponse,
    CharacterCreationRequest
} from "./__generated__/CreateNewNpcMutation.graphql";

const mutation = graphql`
    mutation CreateNewNpcMutation($request: CharacterCreationRequest!) {
        createNpc(input: {
            request: $request
        }) {
            character {
                id
                clan {
                    name
                }
            }
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
