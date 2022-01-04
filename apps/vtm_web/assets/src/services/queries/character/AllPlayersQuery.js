// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const allPlayersQuery: GraphQLTaggedNode = graphql`
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
