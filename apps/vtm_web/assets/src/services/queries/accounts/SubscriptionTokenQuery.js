// @flow

import { useCustomLazyLoadQuery } from "../../../_base/relay-utils";

import graphql from 'babel-plugin-relay/macro';

const subscriptionTokenQuery = graphql`
    query SubscriptionTokenQuery {
        subscriptionToken
    }
`;

const useSubscriptionTokenQuery = (): string =>
    useCustomLazyLoadQuery(subscriptionTokenQuery, {}, {
        fetchPolicy: "network-only"
    })?.subscriptionToken;

export default useSubscriptionTokenQuery;
