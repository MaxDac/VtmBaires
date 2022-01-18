// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {
    DeleteHavenCharacterInput,
    DeleteHavenCharacterMutationResponse
} from "./__generated__/DeleteHavenCharacterMutation.graphql";

const mutation = graphql`
    mutation DeleteHavenCharacterMutation($input: DeleteHavenCharacterInput!) {
        deleteHavenCharacter(input: $input) {
            result {
                id
                name
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, input: DeleteHavenCharacterInput): Promise<DeleteHavenCharacterMutationResponse> => {
    return wrapMutation<DeleteHavenCharacterMutationResponse>(environment, mutation, {input});
}

export default mutationPromise;
