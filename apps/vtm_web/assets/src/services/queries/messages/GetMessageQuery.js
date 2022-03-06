// @flow

import graphql from 'babel-plugin-relay/macro';
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {GetMessageQueryResponse, GetMessageQueryVariables,} from "./__generated__/GetMessageQuery.graphql";

export const getMessageQuery: Query<GetMessageQueryVariables, GetMessageQueryResponse> = graphql`
    query GetMessageQuery($messageId: ID!) {
        getMessage(messageId: $messageId) {
            id
            subject
            senderUser {
                id
                name
            }
            receiverUser {
                id
                name
            }
            senderCharacter {
                id
                name
            }
            receiverCharacter {
                id
                name
            }
            senderUserId
            senderCharacterId
            receiverUserId
            receiverCharacterId
            text
            read
            onGame
            insertedAt
            modifiedAt
        }
    }
`;
