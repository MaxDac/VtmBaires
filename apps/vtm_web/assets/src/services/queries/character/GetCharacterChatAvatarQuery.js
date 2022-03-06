// @flow

import graphql from 'babel-plugin-relay/macro';
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {
    GetCharacterChatAvatarQueryResponse,
    GetCharacterChatAvatarQueryVariables,
} from "./__generated__/GetCharacterChatAvatarQuery.graphql";

export const getCharacterChatAvatarQuery: Query<GetCharacterChatAvatarQueryVariables, GetCharacterChatAvatarQueryResponse> = graphql`
    query GetCharacterChatAvatarQuery($characterId: ID!) {
        getCharacterChatAvatar(characterId: $characterId) {
            id
            chatAvatar
        }        
    }
`;
