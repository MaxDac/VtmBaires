// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {HuntMutationResponse} from "./__generated__/HuntMutation.graphql";

const mutation = graphql`
    mutation HuntMutation($characterId: ID!) {
        hunt(input: {
            characterId: $characterId
        }) {
            result
        }
    }
`;

const mutationPromise = (environment: IEnvironment, characterId: string): Promise<HuntMutationResponse> => {
    return wrapMutation<HuntMutationResponse>(environment, mutation, {
        characterId
    });
}

export default mutationPromise;
