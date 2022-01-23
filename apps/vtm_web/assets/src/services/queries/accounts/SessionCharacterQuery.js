// @flow

import graphql from 'babel-plugin-relay/macro';
import { useCustomLazyLoadQuery, wrapQuery } from "../../../_base/relay-utils";
import type {
  SessionCharacterQueryResponse,
  SessionCharacterQueryVariables,
} from "./__generated__/SessionCharacterQuery.graphql";
import type {IEnvironment} from "relay-runtime";
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import { emptyExactObject } from "../../../_base/utils";

const sessionCharacterQuery: Query<SessionCharacterQueryVariables, SessionCharacterQueryResponse> = graphql`
    query SessionCharacterQuery {
        getSessionCharacter {
            id
            name
            approved
            clan {
                id
                name
            }
        }
    }
`;

export const useSessionCharacter = (): SessionCharacterQueryResponse =>
    useCustomLazyLoadQuery(sessionCharacterQuery, emptyExactObject());

export const getSessionCharacter = (environment: IEnvironment): Promise<?SessionCharacterQueryResponse> =>
    wrapQuery(environment, sessionCharacterQuery, emptyExactObject());


