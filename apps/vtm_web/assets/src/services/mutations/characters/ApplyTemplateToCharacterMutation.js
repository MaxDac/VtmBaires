// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type { ApplyTemplateToCharacterMutationResponse } from "./__generated__/ApplyTemplateToCharacterMutation.graphql";

const mutation = graphql`
    mutation ApplyTemplateToCharacterMutation($characterId: ID!, $templateId: ID!) {
        applyTemplateToCharacter(input: {
            characterId: $characterId
            templateId: $templateId
        }) {
            result
        }
    }
`;

const mutationPromise = (environment: IEnvironment, characterId: string, templateId: string): Promise<ApplyTemplateToCharacterMutationResponse> => {
    return wrapMutation<ApplyTemplateToCharacterMutationResponse>(environment, mutation, {
        characterId,
        templateId
    });
}

export default mutationPromise;
