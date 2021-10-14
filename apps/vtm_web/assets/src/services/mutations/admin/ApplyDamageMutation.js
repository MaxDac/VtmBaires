// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {DamageType} from "./__generated__/ApplyDamageMutation.graphql";

const mutation = graphql`
    mutation ApplyDamageMutation($characterId: ID!, $damage: Int!, $type: DamageType!) {
        applyDamage(input: {
            characterId: $characterId,
            damageEntity: $damage,
            type: $type
        }) {
            result
        }
    }
`;

const mutationPromise = (environment: IEnvironment, characterId: string, damage: number, type: DamageType): Promise<string> => {
    return wrapMutation<string>(environment, mutation, );
}

export default mutationPromise;
