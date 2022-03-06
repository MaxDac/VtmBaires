// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {ResetResonancesMutationResponse} from "./__generated__/ResetResonancesMutation.graphql";

const mutation = graphql`
    mutation ResetResonancesMutation {
        resetResonances {
            result
        }
    }
`;

const mutationPromise = (environment: IEnvironment): Promise<ResetResonancesMutationResponse> => {
    return wrapMutation<ResetResonancesMutationResponse>(environment, mutation, {});
}

export default mutationPromise;
