// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {
    ChatDiceEntryRequest,
    CreateChatDiceEntryMutationResponse
} from "./__generated__/CreateChatDiceEntryMutation.graphql";

const mutation = graphql`
    mutation CreateChatDiceEntryMutation($entry: ChatDiceEntryRequest) {
        createChatDiceEntry(entry: $entry) {
            id
            chatMapId
            characterId
            characterName
            result
            text
        }
    }
`;

const chatDiceEntryMutationPromise = (environment: IEnvironment, request: ChatDiceEntryRequest): Promise<CreateChatDiceEntryMutationResponse> => {
    return wrapMutation<CreateChatDiceEntryMutationResponse>(environment, mutation, {entry: request});
}

export default chatDiceEntryMutationPromise;
