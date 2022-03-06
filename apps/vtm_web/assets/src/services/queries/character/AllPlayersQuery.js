// @flow

import graphql from 'babel-plugin-relay/macro';
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {AllPlayersQueryResponse, AllPlayersQueryVariables} from "./__generated__/AllPlayersQuery.graphql";

export const allPlayersQuery: Query<AllPlayersQueryVariables, AllPlayersQueryResponse> = graphql`
    query AllPlayersQuery {
        playersCharactersList {
            id
            name
            user {
                id
            }
        }
    }
`;
