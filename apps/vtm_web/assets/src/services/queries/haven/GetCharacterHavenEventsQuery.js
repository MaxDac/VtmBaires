// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getCharacterHavenEventsQuery: GraphQLTaggedNode = graphql`
    query GetCharacterHavenEventsQuery($characterId: ID!) {
        getCharacterDomainEvents(input: {characterId: $characterId}) {
            result {
                ...HavenEventFragment_fragment @relay(mask: false)
            }
        }
    }
`;
