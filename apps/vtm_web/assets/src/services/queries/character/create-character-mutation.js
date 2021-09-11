// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutationAuthorized } from "../../relay-utils";
import type {Id} from "./character-types";

const mutation = graphql`
    mutation createCharacterMutation($request: CharacterCreationRequest!) {
        createCharacter(request: $request) {
            info {
                id
                name
            }
            clan {
                id
                name
            }
        }
    }
`;

export type CreationResult = {
    id: Id;
    name: string;
}

export type CharacterCreationRequest = {
    name: string;
    avatar: string;
    clanId: number;
    description: string;
    biography: string;
}

const mutationPromise = (request: CharacterCreationRequest): Promise<CreationResult> =>
    wrapMutationAuthorized<{ info: CreationResult }>(mutation, {
        request: {
            ...request,
            clanId: Number(request.clanId)
        }
    }).then(({info}) => info);

export default mutationPromise;
