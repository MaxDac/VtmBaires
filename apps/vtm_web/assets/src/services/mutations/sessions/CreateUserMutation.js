// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../../../_base/relay-utils";
import type {CreateUserMutationResponse} from "./__generated__/CreateUserMutation.graphql";

const mutation = graphql`
    mutation CreateUserMutation($email: String!, $password: String!, $name: String!) {
        createUser(email: $email, password: $password, name: $name) {
            id
        }
    }
`;

const mutationPromise = (email: string, password: string, name: string): Promise<CreateUserMutationResponse> => {
    const variables = {
        "email": email,
        "password": password,
        "name": name
    };

    return wrapMutation<CreateUserMutationResponse>(mutation, variables);
}

export default mutationPromise;
