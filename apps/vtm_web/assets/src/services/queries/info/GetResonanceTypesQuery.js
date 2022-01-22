// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetResonanceTypesQuery} from "./__generated__/GetResonanceTypesQuery.graphql";
import {castNotNull, isNotNullNorEmpty} from "../../../_base/utils";

export type ResonanceType = string

export const getResonanceTypesQuery: GraphQLTaggedNode = graphql`
    query GetResonanceTypesQuery {
        getResonanceTypes {
            result
        }
    }
`;

export const useResonanceTypes = (): $ReadOnlyArray<ResonanceType> =>
    (useCustomLazyLoadQuery<GetResonanceTypesQuery>(getResonanceTypesQuery, {}, {
        fetchPolicy: "store-or-network"
    })?.getResonanceTypes?.result ?? [])
        .filter(isNotNullNorEmpty)
        .map(castNotNull);
