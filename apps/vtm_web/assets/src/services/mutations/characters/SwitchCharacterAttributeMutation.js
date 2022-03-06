// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {SwitchCharacterAttributeMutationVariables} from "./__generated__/SwitchCharacterAttributeMutation.graphql";

const mutation = graphql`
    mutation SwitchCharacterAttributeMutation($characterId: ID!, $firstAttribute: String, $secondAttribute: String) {
        switchCharacterAttributes(characterId: $characterId, firstAttribute: $firstAttribute, secondAttribute: $secondAttribute) {
            id
        }
    }
`;

const switchCharacterAttributeMutation = (environment: IEnvironment, request: SwitchCharacterAttributeMutationVariables): Promise<any> =>
    wrapMutation<any>(environment, mutation, request);

export default switchCharacterAttributeMutation;
