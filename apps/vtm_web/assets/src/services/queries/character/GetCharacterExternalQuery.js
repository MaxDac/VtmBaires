// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const GetCharacterExternalQuery: GraphQLTaggedNode = graphql`
    query GetCharacterExternalQuery($id: ID!) {
        getCharacter(id: $id) {
            ...CharacterFragments_characterAvatar
            ...CharacterFragments_characterInfo
            ...CharacterFragments_characterSheet
        }
    }
`;
