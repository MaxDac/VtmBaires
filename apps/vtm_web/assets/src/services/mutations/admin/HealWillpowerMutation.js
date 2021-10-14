// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";

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

const mutationPromise = (environment: IEnvironment): Promise<> => {
    return wrapMutation<>(environment, mutation, );
}

export default mutationPromise;
