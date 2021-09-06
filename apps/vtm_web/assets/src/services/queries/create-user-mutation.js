// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from "../relay-utils";

export type Roles = 
    | 'Player'
    | 'Master'

const mutation = graphql`
    mutation createUserMutation($email: String!, $password: String!, $name: String!) {
        createUser(email: $email, password: $password, name: $name) {
            id
        }
    }
`;

export type CreationResult = {
    id: number;
}

const mutationPromise = (email: string, password: string, name: string): Promise<CreationResult> => {
    const variables = {
        "email": email,
        "password": password,
        "name": name
    };

    return wrapMutation<CreationResult>(mutation, variables);
}

export default mutationPromise;
