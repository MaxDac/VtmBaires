// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {
    FinalizeCharacterCreationInput,
    FinalizeCharacterCreationMutationResponse
} from "./__generated__/FinalizeCharacterCreationMutation.graphql.js";

const mutation = graphql`
    mutation FinalizeCharacterCreationMutation($input: FinalizeCharacterCreationInput!) {
        finalizeCharacterCreation(input: $input) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (request: FinalizeCharacterCreationInput): Promise<FinalizeCharacterCreationMutationResponse> =>
    wrapMutation<FinalizeCharacterCreationMutationResponse>(mutation, {
        input: request
    });

export default mutationPromise;
