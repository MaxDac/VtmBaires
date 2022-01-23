// @flow

import type {
  GetAllChatLocationsQueryResponse,
  GetAllChatLocationsQueryVariables,
} from "./__generated__/GetAllChatLocationsQuery.graphql";
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";

import graphql from 'babel-plugin-relay/macro';

export const getAllChatLocationsQuery: Query<GetAllChatLocationsQueryVariables, GetAllChatLocationsQueryResponse> = graphql`
    query GetAllChatLocationsQuery {
        allChatLocations {
            id
            name
        }
    }
`;
