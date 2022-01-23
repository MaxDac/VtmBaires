// @flow

import type { GetCharacterAvatarQueryVariables } from "./__generated__/GetCharacterAvatarQuery.graphql";
import type { GetCharacterCompleteQueryResponse } from "./__generated__/GetCharacterCompleteQuery.graphql";
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";

import graphql from 'babel-plugin-relay/macro';

export const getCharacterAvatarQuery: Query<GetCharacterAvatarQueryVariables, GetCharacterCompleteQueryResponse> = graphql`
    query GetCharacterAvatarQuery($id: ID!) {
        getCharacterAvatar(characterId: $id) {
            id
            avatar
        }
    }
`;
