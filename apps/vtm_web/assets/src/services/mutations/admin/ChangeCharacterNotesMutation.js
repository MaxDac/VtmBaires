// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {
    ChangeCharacterNotesInput,
    ChangeCharacterNotesMutationResponse
} from "./__generated__/ChangeCharacterNotesMutation.graphql";

const mutation = graphql`
    mutation ChangeCharacterNotesMutation($input: ChangeCharacterNotesInput!) {
        changeCharacterNotes(input: $input) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: ChangeCharacterNotesInput): Promise<ChangeCharacterNotesMutationResponse> => {
    return wrapMutation<ChangeCharacterNotesMutationResponse>(environment, mutation, {input: request});
}

export default mutationPromise;
