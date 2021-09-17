// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {
    CharacterCreationRequest,
    CreateCharacterMutationResponse
} from "./__generated__/CreateCharacterMutation.graphql";
import type {IEnvironment} from "relay-runtime";

const mutation = graphql`
    mutation CreateCharacterMutation($request: CharacterCreationRequest!) {
        createCharacter(request: $request) {
            id
            name
        }
    }
`;
//
// export type CreationResult = {
//     id: string;
//     name: string;
// }
//
// export type CharacterCreationRequest = {
//     name: string;
//     avatar: string;
//     clanId: number;
//     description: string;
//     biography: string;
// }

const mutationPromise = (environment: IEnvironment, request: CharacterCreationRequest): Promise<CreateCharacterMutationResponse> => {
    return wrapMutation<CreateCharacterMutationResponse>(environment, mutation, {
        request: {
            ...request,
            clanId: request.clanId
        }
    });
}

export default mutationPromise;
