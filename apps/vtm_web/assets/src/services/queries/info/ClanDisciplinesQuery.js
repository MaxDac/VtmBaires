// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime/query/GraphQLTag";
import type {ClanDisciplinesQueryResponse} from "./__generated__/ClanDisciplinesQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

export const clanDisciplinesQuery: GraphQLTaggedNode = graphql`
    query ClanDisciplinesQuery($clanId: ID!) {
        clanDisciplines(clanId: $clanId) {
            id
            name
            description
        }
    }
`;

export function useClanDisciplines(clanId: string): ?ClanDisciplinesQueryResponse {
    return useCustomLazyLoadQuery(clanDisciplinesQuery, { clanId });
}
