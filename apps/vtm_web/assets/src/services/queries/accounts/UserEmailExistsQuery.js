// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapQuery} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {
    UserEmailExistsQueryResponse,
    UserEmailExistsQueryVariables,
} from "./__generated__/UserEmailExistsQuery.graphql";

export const userEmailExistsQuery: Query<UserEmailExistsQueryVariables, UserEmailExistsQueryResponse> = graphql`
    query UserEmailExistsQuery($email: String!) {
        userEmailExists(email: $email)
    }
`;

export const userEmailExists = (environment: IEnvironment, email: string): Promise<boolean> =>
    wrapQuery(environment, userEmailExistsQuery, {email})
        .then(r => r?.userEmailExists);
