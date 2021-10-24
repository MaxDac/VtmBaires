// @flow

import graphql from 'babel-plugin-relay/macro';
import type { GraphQLTaggedNode } from "relay-runtime/query/GraphQLTag";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

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
                clan {
                    name
                }
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
    clan: {
        name: string;
    }
}

export const useUserCharactersQuery = (reloadCount?: number): Array<UserCharacter> =>
    useCustomLazyLoadQuery(userCharactersQuery, {}, {
        fetchPolicy: "store-and-network",
        fetchKey: reloadCount ?? 0
    })
        ?.me
        ?.userCharacters ?? [];
