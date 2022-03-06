// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {RouseCheckInput, RouseCheckMutationResponse} from "./__generated__/RouseCheckMutation.graphql";

const mutation = graphql`
    mutation RouseCheckMutation($input: RouseCheckInput!) {
        rouseCheck(input: $input) {
            result {
                id
                character {
                    id
                }
                text
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: RouseCheckInput): Promise<RouseCheckMutationResponse> => {
    return wrapMutation<RouseCheckMutationResponse>(environment, mutation, {input: request});
}

export default mutationPromise;
