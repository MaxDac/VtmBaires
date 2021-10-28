// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const attributesCompleteQuery: GraphQLTaggedNode = graphql`
    query AttributesCompleteQuery {
        attributes {
            id
            name
            description
            attributeType {
                id
                name
                section
            }
        }
    }
`;
