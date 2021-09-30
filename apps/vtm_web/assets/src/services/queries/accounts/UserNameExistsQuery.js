// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {wrapQuery} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";

export const userNameExistsQuery: GraphQLTaggedNode = graphql`
    query UserNameExistsQuery($name: String!) {
        userNameExists(name: $name)
    }
`;

export const userNameExists = (environment: IEnvironment, name: string): Promise<boolean> =>
    wrapQuery(environment, userNameExistsQuery, {name})
        .then(r => r?.userNameExists);
