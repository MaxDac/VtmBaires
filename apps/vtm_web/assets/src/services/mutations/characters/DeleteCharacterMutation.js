// @flow

import graphql from 'babel-plugin-relay/macro';
import type {IEnvironment} from "relay-runtime";
import {wrapMutation} from "../../../_base/relay-utils";

const deleteCharacterMutation = graphql`
    mutation DeleteCharacterMutation($characterId: ID!) {
        deleteCharacter(characterId: $characterId)
    }
`;

const mutationPromise = (environment: IEnvironment, characterId: string): Promise<boolean> =>
    wrapMutation<any>(environment, deleteCharacterMutation, {
        characterId
    });

export default mutationPromise;
