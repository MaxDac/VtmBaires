// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery, wrapQuery} from "../../../_base/relay-utils";
import type {BaseInfo} from "../../base-types";

const listSessionQuery = graphql`
    query SessionQuery {
        list {
            id
            name
        }
    }
`;

// const session = (): Promise<SessionResponse> => wrapQuery(listSessionQuery, {});
export type SessionCharacter = {
    id: string;
    name: string;
}

export const useSessionQuery = (): Array<SessionCharacter>  => {
    return useCustomLazyLoadQuery(listSessionQuery, {});
}

export const getSessions = (): Promise<Array<BaseInfo>> =>
    wrapQuery(listSessionQuery, {}, x => x.list);
