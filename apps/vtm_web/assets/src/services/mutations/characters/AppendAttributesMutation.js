// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {
    CharacterAttributeRequest,
    AppendAttributesMutationResponse
} from "./__generated__/AppendAttributesMutation.graphql";

const mutation = graphql`
    mutation AppendAttributesMutation($request: [CharacterAttributeRequest]!, $newStage: Int!) {
        appendCharacterAttributes(request: $request, newStage: $newStage) {
            id
            name
        }
    }
`;

const mutationPromise = (request: Array<CharacterAttributeRequest>, newStage: number): Promise<AppendAttributesMutationResponse> =>
    wrapMutation<AppendAttributesMutationResponse>(mutation, { request, newStage });

export default mutationPromise;
