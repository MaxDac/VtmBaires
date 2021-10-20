// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getAllChatLocationsQuery: GraphQLTaggedNode = graphql`
    query GetAllChatLocationsQuery {
        allChatLocations {
            id
            name
        }
    }
`;
