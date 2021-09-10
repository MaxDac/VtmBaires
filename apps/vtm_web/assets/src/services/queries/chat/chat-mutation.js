// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutationAuthorized} from "../../relay-utils";
import type { ChatEntry } from "./chat-queries";

export type ChatEntryRequest = {
    characterId: string;
    chatMapId: string;
    result: string;
    text: string;
}

const mutation = graphql`
    mutation chatMutation($entry: ChatEntryRequest) {
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

const mutationPromise = (request: ChatEntryRequest): Promise<ChatEntry> =>
    wrapMutationAuthorized<ChatEntry>(mutation, request);

export default mutationPromise;
