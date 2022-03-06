// @flow

import graphql from 'babel-plugin-relay/macro';
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {
    GetCharactersAvatarQueryResponse,
    GetCharactersAvatarQueryVariables,
} from "./__generated__/GetCharactersAvatarQuery.graphql";

export const getCharactersAvatarQuery: Query<GetCharactersAvatarQueryVariables, GetCharactersAvatarQueryResponse> = graphql`
    query GetCharactersAvatarQuery($characterIds: [ID!]) {
        getCharactersAvatar(characterIds: $characterIds) {
            character {
                id
            }
            avatar {
                id
                avatar
            }
        }
    }
`;
