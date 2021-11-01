// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const listSessionQuery: GraphQLTaggedNode = graphql`
    query SessionQuery {
        sessionsList {
            user {
                id
                name
                role
            }
            character {
                id
                name
            }
            location {
                id
                name
            }
        }
    }
`;
