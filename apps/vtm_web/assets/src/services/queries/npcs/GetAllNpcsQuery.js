// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetAllNpcsQuery} from "./__generated__/GetAllNpcsQuery.graphql";
import { emptyArray } from "../../../_base/utils";

export const getAllNpcsQuery: GraphQLTaggedNode = graphql`
    query GetAllNpcsQuery {
        allNpcs {
            id
            name
            chatAvatar
            isComplete
            approved
        }
    }
`;

export type Npc = {
    id: string;
    name: ?string;
    chatAvatar: ?string;
    isComplete: ?boolean;
    approved: ?boolean;
};

export const useNpcsQuery = (reloadCount: number): Array<Npc> =>
    useCustomLazyLoadQuery<GetAllNpcsQuery>(getAllNpcsQuery, {}, {
        fetchPolicy: "store-and-network",
        fetchKey: reloadCount
    })?.allNpcs?.map(n => ({
        id: n?.id ?? "",
        name: n?.name,
        chatAvatar: n?.chatAvatar,
        isComplete: n?.isComplete,
        approved: n?.approved
    })) ?? emptyArray<Npc>();
