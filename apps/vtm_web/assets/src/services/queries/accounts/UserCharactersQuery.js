// @flow

import graphql from 'babel-plugin-relay/macro';
import type { GraphQLTaggedNode } from "relay-runtime/query/GraphQLTag";
import {useLazyLoadQuery} from "react-relay";

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

export const useUserCharactersQuery = (): Array<UserCharacter> =>
    useLazyLoadQuery(userCharactersQuery, {}, {
        fetchPolicy: "network-only"
    })
        ?.me
        ?.userCharacters ?? [];
