// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getCharactersChatAvatarQuery: GraphQLTaggedNode = graphql`
    query GetCharactersChatAvatarQuery($characterIds: [ID!]) {
        getCharactersChatAvatar(characterIds: $characterIds) {
            id
            chatAvatar
        }
    }
`;
