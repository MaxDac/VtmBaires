// @flow

import graphql from 'babel-plugin-relay/macro';
import { useCustomLazyLoadQuery, wrapQuery } from "../../../_base/relay-utils";
import type {SessionCharacterQueryResponse} from "./__generated__/SessionCharacterQuery.graphql";
import type {IEnvironment} from "relay-runtime";

const sessionCharacterQuery = graphql`
    query SessionCharacterQuery {
        getSessionCharacter {
            id
            name
            approved
            clan {
                name
            }
        }
    }
`;

export const useSessionCharacter = (): SessionCharacterQueryResponse =>
    useCustomLazyLoadQuery(sessionCharacterQuery, {});

export const getSessionCharacter = (environment: IEnvironment): Promise<?SessionCharacterQueryResponse> =>
    wrapQuery(environment, sessionCharacterQuery, {});


