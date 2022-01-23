// @flow

import type {
  GetCharacterStageQueryResponse,
  GetCharacterStageQueryVariables,
} from "./__generated__/GetCharacterStageQuery.graphql";
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";

import graphql from 'babel-plugin-relay/macro';

export const getCharacterStageQuery: Query<GetCharacterStageQueryVariables, GetCharacterStageQueryResponse> = graphql`
    query GetCharacterStageQuery($id: ID!) {
        getCharacter(id: $id) {
            id
            stage
            isComplete
            approved
        }
    }
`;
