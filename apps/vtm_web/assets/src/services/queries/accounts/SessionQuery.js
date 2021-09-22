// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

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
