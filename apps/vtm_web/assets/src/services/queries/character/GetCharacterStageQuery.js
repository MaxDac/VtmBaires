// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export const getCharacterStageQuery: GraphQLTaggedNode = graphql`
    query GetCharacterStageQuery($id: ID!) {
        getCharacter(id: $id) {
            id
            stage
            isComplete
            approved
        }
    }
`;
