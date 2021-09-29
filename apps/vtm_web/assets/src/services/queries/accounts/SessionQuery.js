// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {SessionQueryResponse} from "./__generated__/SessionQuery.graphql";

const listSessionQuery = graphql`
    query SessionQuery {
        sessionsList {
            id
            name
            sessionCharacter {
                id
                name
            }
        }
    }
`;

export const useSessionQuery = (): SessionQueryResponse =>
    useCustomLazyLoadQuery(listSessionQuery, {});
