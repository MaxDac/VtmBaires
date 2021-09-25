// @flow

import graphql from 'babel-plugin-relay/macro';
import type {IEnvironment} from "relay-runtime";
import {wrapMutation} from "../../../_base/relay-utils";
import type {FinalizeCharacterMutationResponse} from "./__generated__/FinalizeCharacterMutation.graphql";

const finalizeCharacterMutation = graphql`
    mutation FinalizeCharacterMutation($characterId: ID!) {
        finalizeCharacter(characterId: $characterId) {
            id
        }
    }
`;

const mutationPromise = (environment: IEnvironment, characterId: string): Promise<FinalizeCharacterMutationResponse> =>
    wrapMutation<FinalizeCharacterMutationResponse>(environment, finalizeCharacterMutation, {
        characterId
    });

export default mutationPromise;
