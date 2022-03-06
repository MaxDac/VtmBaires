// @flow

import graphql from 'babel-plugin-relay/macro';
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {
    GetHavenUnresolvedEventsQueryResponse,
    GetHavenUnresolvedEventsQueryVariables,
} from "./__generated__/GetHavenUnresolvedEventsQuery.graphql";

export const getHavenUnresolvedEventsQuery: Query<GetHavenUnresolvedEventsQueryVariables, GetHavenUnresolvedEventsQueryResponse> = graphql`
    query GetHavenUnresolvedEventsQuery {
        getUnresolvedEvents {
            result {
                ...HavenEventFragment_fragment @relay(mask: false)
            }
        }
    }
`;
