// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {SetHavenInfoRequest, SetHavenInfoMutationResponse} from "./__generated__/SetHavenInfoMutation.graphql";

const mutation = graphql`
    mutation SetHavenInfoMutation($havenId: ID!, $request: SetHavenInfoRequest!) {
        setHavenInfo(input: {
            havenId: $havenId,
            request: $request
        }) {
            result {
                id
                name
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, havenId: string, request: SetHavenInfoRequest): Promise<SetHavenInfoMutationResponse> => {
    return wrapMutation<SetHavenInfoMutationResponse>(environment, mutation, {
        havenId,
        request
    });
}

export default mutationPromise;
