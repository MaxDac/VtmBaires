// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapMutation } from '../../../_base/relay-utils';
import type { IEnvironment } from "relay-runtime/store/RelayStoreTypes";

const updateSessionCharacterMutation = graphql`
    mutation UpdateSessionCharacterMutation($characterId: ID!, $characterName: String!) {
        updateSessionCharacter(characterId: $characterId, characterName: $characterName) {
            id
            name
        }
    }
`;

export const updateSessionCharacter = (environment: IEnvironment, id: string, name: string): Promise<any> => 
    wrapMutation(environment, updateSessionCharacterMutation, {
        characterId: id,
        characterName: name
    });
