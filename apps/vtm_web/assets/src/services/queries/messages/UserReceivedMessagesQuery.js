// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  UserReceivedMessagesQueryResponse,
  UserReceivedMessagesQueryVariables,
} from "./__generated__/UserReceivedMessagesQuery.graphql";

export const userReceivedMessagesQuery: Query<UserReceivedMessagesQueryVariables, UserReceivedMessagesQueryResponse> = graphql`
    query UserReceivedMessagesQuery {
        me {
            receivedMessages {
                id
                subject
                senderUser {
                    id
                    name
                }
                senderCharacter {
                    id
                    name
                }
                senderUserId
                senderCharacterId
                read
                onGame
                insertedAt
                modifiedAt
            }
        }
    }
`;
