// @flow

import graphql from 'babel-plugin-relay/macro';
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {
    GetMessageDigestQueryResponse,
    GetMessageDigestQueryVariables,
} from "./__generated__/GetMessageDigestQuery.graphql";

export const getMessageDigestQuery: Query<GetMessageDigestQueryVariables, GetMessageDigestQueryResponse> = graphql`
    query GetMessageDigestQuery {
        messagesDigest {
            totalMessages
            unreadMessages
        }
    }
`;
