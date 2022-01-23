// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  GetCreationTemplateQueryResponse,
  GetCreationTemplateQueryVariables,
} from "./__generated__/GetCreationTemplateQuery.graphql";

export const getCreationTemplateQuery: Query<GetCreationTemplateQueryVariables, GetCreationTemplateQueryResponse> = graphql`
    query GetCreationTemplateQuery {
        getCreationTemplates {
            id
            name
            description
        }
    }
`;
