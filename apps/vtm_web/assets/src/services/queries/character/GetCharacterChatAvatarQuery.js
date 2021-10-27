// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getCharacterChatAvatarQuery: GraphQLTaggedNode = graphql`
    query GetCharacterChatAvatarQuery($characterId: ID!) {
        getCharacterChatAvatar(characterId: $characterId) {
            id
            chatAvatar
        }        
    }
`;
