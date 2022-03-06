// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {
    SetCharacterStatusMutationResponse,
    SetCharacterStatusRequest
} from "./__generated__/SetCharacterStatusMutation.graphql";

const mutation = graphql`
    mutation SetCharacterStatusMutation($characterId: ID!, $request: SetCharacterStatusRequest!) {
        setCharacterStatus(input: {
            characterId: $characterId,
            request: $request
        }) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, characterId: string, request: SetCharacterStatusRequest): Promise<SetCharacterStatusMutationResponse> => {
    return wrapMutation<SetCharacterStatusMutationResponse>(environment, mutation, {
        characterId,
        request
    });
}

export default mutationPromise;
