// @flow

import graphql from 'babel-plugin-relay/macro';
import {useLazyLoadQuery} from "react-relay";

const subscriptionTokenQuery = graphql`
    query SubscriptionTokenQuery {
        subscriptionToken
    }
`;

const useSubscriptionTokenQuery = (): string =>
    useLazyLoadQuery(subscriptionTokenQuery, {}, {
        fetchPolicy: "network-only"
    })?.subscriptionToken;

export default useSubscriptionTokenQuery;
