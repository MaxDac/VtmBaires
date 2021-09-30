// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {wrapQuery} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";

export const userEmailExistsQuery: GraphQLTaggedNode = graphql`
    query UserEmailExistsQuery($email: String!) {
        userEmailExists(email: $email)
    }
`;

export const userEmailExists = (environment: IEnvironment, email: string): Promise<boolean> =>
    wrapQuery(environment, userEmailExistsQuery, {email})
        .then(r => r?.userEmailExists);
