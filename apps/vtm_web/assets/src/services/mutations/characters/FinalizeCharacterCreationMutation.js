// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {
    FinalizeCharacterCreationInput,
    FinalizeCharacterCreationMutationResponse
} from "./__generated__/FinalizeCharacterCreationMutation.graphql.js";
import type {IEnvironment} from "relay-runtime";

const mutation = graphql`
    mutation FinalizeCharacterCreationMutation($input: FinalizeCharacterCreationInput!) {
        finalizeCharacterCreation(input: $input) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: FinalizeCharacterCreationInput): Promise<FinalizeCharacterCreationMutationResponse> =>
    wrapMutation<FinalizeCharacterCreationMutationResponse>(environment, mutation, {
        input: request
    });

export default mutationPromise;
