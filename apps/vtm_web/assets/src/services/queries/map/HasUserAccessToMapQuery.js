// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {HasUserAccessToMapQuery} from "./__generated__/HasUserAccessToMapQuery.graphql";

export const hasUserAccessToMapQuery: GraphQLTaggedNode = graphql`
    query HasUserAccessToMapQuery($chatId: ID!) {
        hasUserAccessToMap(chatId: $chatId)
    }
`;

export const useHasUserAccessToMap = (chatId: string): boolean =>
    useCustomLazyLoadQuery<HasUserAccessToMapQuery>(hasUserAccessToMapQuery, {chatId}, {
        fetchPolicy: "network-only"
    })?.hasUserAccessToMap === true;
