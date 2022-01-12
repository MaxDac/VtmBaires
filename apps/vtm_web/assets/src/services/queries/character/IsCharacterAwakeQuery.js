// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {IsCharacterAwakeQuery} from "./__generated__/IsCharacterAwakeQuery.graphql";

export const isCharacterAwakeQuery: GraphQLTaggedNode = graphql`
    query IsCharacterAwakeQuery($characterId: ID!) {
        isCharacterAwake(characterId: $characterId)
    }
`;

export const useIsCharacterAwake = (characterId: string, fetchKey: number): boolean =>
    useCustomLazyLoadQuery<IsCharacterAwakeQuery>(isCharacterAwakeQuery, {characterId}, {
        fetchPolicy: "network-only",
        fetchKey: fetchKey
    })?.isCharacterAwake === true;
