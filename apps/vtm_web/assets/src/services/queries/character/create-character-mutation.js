// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutationAuthorized } from "../../relay-utils";

const mutation = graphql`
    mutation createCharacterMutation($request: CharacterCreationRequest!) {
        createCharacter(request: $request) {
            id
            clan {
                id
                name
            }
            name
        }
    }
`;

export type CreationResult = {
    id: number;
}

export type CharacterCreationRequest = {
    name: string;
    clanId: number;
    description: string;
    biography: string;
}

const mutationPromise = (request: CharacterCreationRequest): Promise<CreationResult> => {
    return wrapMutationAuthorized<CreationResult>(mutation, {
        request: {
            ...request,
            clanId: Number(request.clanId)
        }
    });
};

export default mutationPromise;
