// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getAllNpcsQuery: GraphQLTaggedNode = graphql`
    query GetAllNpcsQuery {
        allNpcs {
            id
            name
            chatAvatar
            isComplete
            approved
        }
    }
`;
