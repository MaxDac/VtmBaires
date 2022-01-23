// @flow

import graphql from 'babel-plugin-relay/macro'
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  ClansQueryResponse,
  ClansQueryVariables,
} from "./__generated__/ClansQuery.graphql";

export const clansQuery: Query<ClansQueryVariables, ClansQueryResponse> = graphql`
    query ClansQuery {
        clans {
            id
            name
        }
    }
`;
