// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutationAuthorized} from "../../relay-utils";
import type { ChatEntry } from "./ChatQueries";
import type {ChatEntryRequest} from "./__generated__/chatMutation.graphql";

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

const chatEntryMutationPromise = (request: ChatEntryRequest): Promise<ChatEntry> => {
    console.log("request", request);
    return wrapMutationAuthorized<ChatEntry>(mutation, { entry: request });
};

export default chatEntryMutationPromise;
