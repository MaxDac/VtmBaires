// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getHavenUnresolvedEventsQuery: GraphQLTaggedNode = graphql`
    query GetHavenUnresolvedEventsQuery {
        getUnresolvedEvents {
            result {
                ...HavenEventFragment_fragment @relay(mask: false)
            }
        }
    }
`;
