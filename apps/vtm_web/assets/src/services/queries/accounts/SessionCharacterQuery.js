// @flow

import graphql from 'babel-plugin-relay/macro'
import {useLazyLoadQuery} from "react-relay";
import {wrapQuery} from "../../../_base/relay-utils";
import type {SessionCharacterQueryResponse} from "./__generated__/SessionCharacterQuery.graphql";
import type {IEnvironment} from "relay-runtime";

const sessionCharacterQuery = graphql`
    query SessionCharacterQuery {
        getSessionCharacter {
            id
            name
        }
    }
`;

export const useSessionCharacter = (): SessionCharacterQueryResponse =>
    useLazyLoadQuery(sessionCharacterQuery, {});

export const getSessionCharacter = (environment: IEnvironment): Promise<?SessionCharacterQueryResponse> =>
    wrapQuery(environment, sessionCharacterQuery, {});


