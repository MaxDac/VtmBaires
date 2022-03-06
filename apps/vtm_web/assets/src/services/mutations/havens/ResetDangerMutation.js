// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {ResetDangerMutationResponse} from "./__generated__/ResetDangerMutation.graphql";

const mutation = graphql`
    mutation ResetDangerMutation {
        resetDanger {
            result
        }
    }
`;

const mutationPromise = (environment: IEnvironment): Promise<ResetDangerMutationResponse> => {
    return wrapMutation<ResetDangerMutationResponse>(environment, mutation, {});
}

export default mutationPromise;
