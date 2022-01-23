// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {
  IsCharacterAwakeQueryResponse,
  IsCharacterAwakeQueryVariables,
} from "./__generated__/IsCharacterAwakeQuery.graphql";
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";

export const isCharacterAwakeQuery: Query<IsCharacterAwakeQueryVariables, IsCharacterAwakeQueryResponse> = graphql`
    query IsCharacterAwakeQuery($characterId: ID!) {
        isCharacterAwake(characterId: $characterId)
    }
`;

export const useIsCharacterAwake = (characterId: string, fetchKey: number): boolean =>
    useCustomLazyLoadQuery(isCharacterAwakeQuery, {characterId}, {
        fetchPolicy: "network-only",
        fetchKey: fetchKey
    })?.isCharacterAwake === true;
