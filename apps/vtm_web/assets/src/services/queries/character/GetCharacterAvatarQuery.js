// @flow

import graphql from 'babel-plugin-relay/macro';

export const getCharacterAvatarQuery: any = graphql`
    query GetCharacterAvatarQuery($id: ID!) {
        getCharacterAvatar(characterId: $id) {
            id
            avatar
        }
    }
`;
