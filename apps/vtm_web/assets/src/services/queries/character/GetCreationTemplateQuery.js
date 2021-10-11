// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getCreationTemplateQuery: GraphQLTaggedNode = graphql`
    query GetCreationTemplateQuery {
        getCreationTemplates {
            id
            name
            description
        }
    }
`;
