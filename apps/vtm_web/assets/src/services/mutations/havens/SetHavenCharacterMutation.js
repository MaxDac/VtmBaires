// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {
    SetHavenCharacterInput,
    SetHavenCharacterMutationResponse
} from "./__generated__/SetHavenCharacterMutation.graphql";

const mutation = graphql`
    mutation SetHavenCharacterMutation($input: SetHavenCharacterInput!) {
        setHavenCharacter(input: $input) {
            result {
                id
                x
                y
                name
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, input: SetHavenCharacterInput): Promise<SetHavenCharacterMutationResponse> => {
    return wrapMutation<SetHavenCharacterMutationResponse>(environment, mutation, {input});
}

export default mutationPromise;
