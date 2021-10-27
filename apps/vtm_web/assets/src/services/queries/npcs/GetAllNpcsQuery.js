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
            isComplete
            approved
            clan {
                id
                name
            }
        }
    }
`;

export type Npc = {
    id: string;
    name: ?string;
    chatAvatar?: ?string;
    isComplete: ?boolean;
    approved: ?boolean;
    clan: ?{
        id: ?string;
        name: ?string;
    }
};

export const useNpcsQuery = (reloadCount: number): Array<Npc> =>
    useCustomLazyLoadQuery<GetAllNpcsQuery>(getAllNpcsQuery, {}, {
        fetchPolicy: "store-and-network",
        fetchKey: reloadCount
    })?.allNpcs?.map(n => ({
        id: n?.id ?? "",
        name: n?.name,
        isComplete: n?.isComplete,
        approved: n?.approved,
        clan: {
            id: n?.clan?.id,
            name: n?.clan?.name
        }
    })) ?? emptyArray<Npc>();
