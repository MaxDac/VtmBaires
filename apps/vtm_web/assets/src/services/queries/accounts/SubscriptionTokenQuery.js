// @flow

import {wrapQuery} from "../../../_base/relay-utils";

import graphql from 'babel-plugin-relay/macro';
import {useEffect, useRef, useState} from "react";
import {useRelayEnvironment} from "react-relay";

const subscriptionTokenQuery = graphql`
    query SubscriptionTokenQuery {
        subscriptionToken
    }
`;

const useSubscriptionTokenQuery = (): ?string => {
    const environment = useRelayEnvironment();
    const [token, setToken] = useState<?string>(null);

    // Too important a call to let Relay mess things up with its cache
    // const token = useCustomLazyLoadQuery(subscriptionTokenQuery, {}, {
    //     fetchPolicy: "network-only"
    // })?.subscriptionToken;

    const refSetToken = useRef(setToken);

    useEffect(() => {
        wrapQuery<string>(environment, subscriptionTokenQuery, {}, r => r?.subscriptionToken)
            .then(tkn => refSetToken.current(tkn));
    }, [environment])

    return token;
}

export default useSubscriptionTokenQuery;
