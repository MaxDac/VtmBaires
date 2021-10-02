// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getMessageDigestQuery: GraphQLTaggedNode = graphql`
    query GetMessageDigestQuery {
        messagesDigest {
            totalMessages
            unreadMessages
        }
    }
`;
