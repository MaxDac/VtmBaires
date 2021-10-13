// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getCharacterDescriptionQuery: GraphQLTaggedNode = graphql`
    query GetCharacterDescriptionQuery($id: ID!) {
        getCharacterDescription(characterId: $id) {
            id
            name
            chatAvatar
            description
        }
    }
`;
