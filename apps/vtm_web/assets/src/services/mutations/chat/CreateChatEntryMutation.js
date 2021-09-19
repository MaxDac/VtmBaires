// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {
    ChatEntryRequest,
    CreateChatEntryMutationResponse
} from "./__generated__/CreateChatEntryMutation.graphql";
import type {IEnvironment} from "relay-runtime";

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

const chatEntryMutationPromise = (environment: IEnvironment, request: ChatEntryRequest): Promise<CreateChatEntryMutationResponse> =>
    wrapMutation<CreateChatEntryMutationResponse>(environment, mutation, { entry: request });

export default chatEntryMutationPromise;
