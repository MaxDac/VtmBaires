// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {DeleteChatEntryMutationResponse} from "./__generated__/DeleteChatEntryMutation.graphql";

const mutation = graphql`
    mutation DeleteChatEntryMutation($id: ID!) {
        deleteChatEntry(input: {
            chatEntryId: $id
        }) {
            result {
                id
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, id: string): Promise<DeleteChatEntryMutationResponse> => {
    return wrapMutation<DeleteChatEntryMutationResponse>(environment, mutation, {
        id
    });
}

export default mutationPromise;
