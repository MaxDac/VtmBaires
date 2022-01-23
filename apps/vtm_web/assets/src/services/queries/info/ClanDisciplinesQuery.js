// @flow

import graphql from 'babel-plugin-relay/macro';
import type {
  ClanDisciplinesQueryResponse,
  ClanDisciplinesQueryVariables,
} from "./__generated__/ClanDisciplinesQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";

export const clanDisciplinesQuery: Query<ClanDisciplinesQueryVariables, ClanDisciplinesQueryResponse> = graphql`
    query ClanDisciplinesQuery($clanId: ID!) {
        clanDisciplines(clanId: $clanId) {
            id
            name
            description
        }
    }
`;

export const useClanDisciplines = (clanId: string): ?ClanDisciplinesQueryResponse =>
    useCustomLazyLoadQuery(clanDisciplinesQuery, {clanId});
