// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutationAuthorized } from "../../relay-utils";
import type {Id} from "./character-types";

export type CharacterAttributeRequest = {
    attributeId: string,
    characterId: string,
    value: number;
}

const mutation = graphql`
    mutation appendAttributesMutation($request: [CharacterAttributeRequest]!, $newStage: Int!) {
        appendCharacterAttributes(request: $request, newStage: $newStage) {
            info {
                id
                name
            }
        }
    }
`;

export type AttributeAppendResult = {
    id: Id;
    name: string;
}

const mutationPromise = (request: Array<CharacterAttributeRequest>, newStage: number): Promise<AttributeAppendResult> => {
    return wrapMutationAuthorized<{ info: AttributeAppendResult }>(mutation, { request, newStage })
        .then(({info}) => info);
};

export default mutationPromise;
