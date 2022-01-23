// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  CreationClansQueryResponse,
  CreationClansQueryVariables,
} from "./__generated__/CreationClansQuery.graphql";

export const creationClansQuery: Query<CreationClansQueryVariables, CreationClansQueryResponse> = graphql`
    query CreationClansQuery {
        creationClans {
            id
            name
        }
    }
`;
