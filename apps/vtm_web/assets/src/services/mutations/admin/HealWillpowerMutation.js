// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type { HealWillpowerMutationResponse } from "./__generated__/HealWillpowerMutation.graphql";

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

const mutationPromise = (environment: IEnvironment): Promise<HealWillpowerMutationResponse> => {
    return wrapMutation<HealWillpowerMutationResponse>(environment, mutation, );
}

export default mutationPromise;
