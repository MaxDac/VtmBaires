// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {DefineNpcStatsMutationResponse} from "./__generated__/DefineNpcStatsMutation.graphql";
import {NpcStatsRequest} from "./__generated__/DefineNpcStatsMutation.graphql";

const mutation = graphql`
    mutation DefineNpcStatsMutation($characterId: ID!, $request: NpcStatsRequest!) {
        defineNpcStats(input: {
            characterId: $characterId,
            request: $request
        }) {
            response {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, characterId: string, request: NpcStatsRequest): Promise<DefineNpcStatsMutationResponse> => {
    return wrapMutation<DefineNpcStatsMutationResponse>(environment, mutation, {
        characterId,
        request
    });
}

export default mutationPromise;
