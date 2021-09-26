// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getMessageQuery: GraphQLTaggedNode = graphql`
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
                chatAvatar
            }
            receiverCharacter {
                id
                name
                chatAvatar
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
