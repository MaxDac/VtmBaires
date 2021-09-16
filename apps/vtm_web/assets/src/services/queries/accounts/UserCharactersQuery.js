// @flow

import graphql from 'babel-plugin-relay/macro';
import type { GraphQLTaggedNode } from "relay-runtime/query/GraphQLTag";
import {useWrappedQuery} from "../../../_base/relay-utils";
import {useEnv} from "../../../_base/relay-environment";
import {useRelayEnvironment} from "react-relay";

export const userCharactersQuery: GraphQLTaggedNode = graphql`
    query UserCharactersQuery {
        me {
            userCharacters {
                id
                name
                stage
                approved
                isComplete
                chatAvatar
            }
        }
    }
`;

export type UserCharacter = {
    id: string;
    name: string;
    stage: number;
    approved: boolean;
    isComplete: boolean;
    chatAvatar: string;
}

export function useUserCharactersQuery(): Array<UserCharacter> {
    const environment = useRelayEnvironment();
    return useWrappedQuery<Array<UserCharacter>>(
        environment,
        userCharactersQuery,
            {}, {
            extractor: x => x?.me?.userCharacters
        }) ?? [];
}
