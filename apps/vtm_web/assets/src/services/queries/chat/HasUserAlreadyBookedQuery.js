// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

export const hasUserAlreadyBookedQuery: GraphQLTaggedNode = graphql`
    query HasUserAlreadyBookedQuery {
        hasUserAlreadyBooked
    }
`;

export const useHasUserAlreadyBooked = (): boolean =>
    useCustomLazyLoadQuery(hasUserAlreadyBookedQuery, {}, {
        fetchPolicy: "network-only"
    })?.hasUserAlreadyBooked === true;
