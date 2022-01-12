// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {AwakeCharacterMutationResponse} from "./__generated__/AwakeCharacterMutation.graphql";

const mutation = graphql`
    mutation AwakeCharacterMutation($characterId: ID!) {
        awake(input: {
            characterId: $characterId
        }) {
            result
        }
    }
`;

const mutationPromise = (environment: IEnvironment, characterId: string): Promise<AwakeCharacterMutationResponse> => {
    return wrapMutation<AwakeCharacterMutationResponse>(environment, mutation, {
        characterId
    });
}

export default mutationPromise;
