// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {
    ChatEntryRequest,
    CreateChatEntryMutationResponse
} from "./__generated__/CreateChatEntryMutation.graphql";

const mutation = graphql`
    mutation CreateChatEntryMutation($entry: ChatEntryRequest) {
        createChatEntry(entry: $entry) {
            id
            chatMapId
            characterId
            characterName
            result
            text
        }
    }
`;

const chatEntryMutationPromise = (request: ChatEntryRequest): Promise<CreateChatEntryMutationResponse> =>
    wrapMutation<CreateChatEntryMutationResponse>(mutation, { entry: request });

export default chatEntryMutationPromise;
