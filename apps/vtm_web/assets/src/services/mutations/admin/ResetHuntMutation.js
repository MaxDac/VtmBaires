// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {ResetHuntMutationResponse} from "./__generated__/ResetHuntMutation.graphql";

const mutation = graphql`
    mutation ResetHuntMutation($characterId: ID!) {
        resetCharacterHunt(input: {
            characterId: $characterId
        }) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, characterId: string): Promise<ResetHuntMutationResponse> => {
    return wrapMutation<ResetHuntMutationResponse>(environment, mutation, {
        characterId
    });
}

export default mutationPromise;
