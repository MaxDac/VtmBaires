// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  GetCharacterHavenEventsQueryResponse,
  GetCharacterHavenEventsQueryVariables,
} from "./__generated__/GetCharacterHavenEventsQuery.graphql";

export const getCharacterHavenEventsQuery: Query<GetCharacterHavenEventsQueryVariables, GetCharacterHavenEventsQueryResponse> = graphql`
    query GetCharacterHavenEventsQuery($characterId: ID!) {
        getCharacterDomainEvents(input: {characterId: $characterId}) {
            result {
                ...HavenEventFragment_fragment @relay(mask: false)
            }
        }
    }
`;
