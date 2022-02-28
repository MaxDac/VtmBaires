// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {
    HealWillpowerMutationResponse,
    HealWillpowerMutationVariables
} from "./__generated__/HealWillpowerMutation.graphql";

const mutation = graphql`
    mutation HealWillpowerMutation($characterId: ID!, $quantity: Int!) {
        healWillpower(input: {
            characterId: $characterId,
            quantity: $quantity
        }) {
            result
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: HealWillpowerMutationVariables): Promise<HealWillpowerMutationResponse> => {
    return wrapMutation<HealWillpowerMutationResponse>(environment, mutation, request);
}

export default mutationPromise;
