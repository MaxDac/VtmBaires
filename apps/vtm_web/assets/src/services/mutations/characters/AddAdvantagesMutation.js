// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {AddAdvantagesInput, AddAdvantagesMutationResponse} from "./__generated__/AddAdvantagesMutation.graphql";

const mutation = graphql`
    mutation AddAdvantagesMutation($input: AddAdvantagesInput!) {
        addAdvantages(input: $input) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: AddAdvantagesInput): Promise<AddAdvantagesMutationResponse> =>
    wrapMutation<AddAdvantagesMutationResponse>(environment, mutation, {
        input: request
    });

export default mutationPromise;
