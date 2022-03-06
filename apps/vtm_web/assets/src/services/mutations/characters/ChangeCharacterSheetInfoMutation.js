// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {
    ChangeCharacterSheetInfoMutationResponse,
    ChangeCharacterSheetInfoMutationVariables
} from "./__generated__/ChangeCharacterSheetInfoMutation.graphql";

const mutation = graphql`
    mutation ChangeCharacterSheetInfoMutation($characterId: ID!, $request: ChangeSheetInfoRequest!) {
        changeSheetInfo(input: {
            characterId: $characterId,
            request: $request
        }) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (
    environment: IEnvironment,
    characterId: string,
    request: ChangeCharacterSheetInfoMutationVariables): Promise<?string> => {
    return wrapMutation<ChangeCharacterSheetInfoMutationResponse>(environment, mutation, {
        characterId,
        request
    })?.then(m => m?.changeSheetInfo?.result?.id);
}

export default mutationPromise;
