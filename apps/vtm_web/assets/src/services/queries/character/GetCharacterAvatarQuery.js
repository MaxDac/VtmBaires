// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GetCharacterAvatarQueryResponse} from "./__generated__/GetCharacterAvatarQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

export const query: any = graphql`
    query GetCharacterAvatarQuery($id: ID!) {
        getCharacterAvatar(characterId: $id) {
            id
            avatar
        }
    }
`;

export default function useCharacterAvatarQuery(characterId: string): ?GetCharacterAvatarQueryResponse {
    return useCustomLazyLoadQuery(query, { id: characterId });
}
