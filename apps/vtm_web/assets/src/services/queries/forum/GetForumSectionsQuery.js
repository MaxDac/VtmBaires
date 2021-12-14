// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import type {GetForumSectionsQuery, GetForumSectionsQueryResponse} from "./__generated__/GetForumSectionsQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

export const getForumSectionsQuery: GraphQLTaggedNode = graphql`
    query GetForumSectionsQuery {
        getForumSections {
            section {
                id
                title
                description
                onGame
                canView
                canEdit
                insertedAt
                updatedAt
            }
            lastThread {
                id
                title
                updatedAt
            }
            hasNewPosts
        }
    }
`;

const useForumSections = (): GetForumSectionsQueryResponse =>
    useCustomLazyLoadQuery<GetForumSectionsQuery>(getForumSectionsQuery, {}, {
        // store and network for checking new messages notifications
        fetchPolicy: "store-and-network"
    });

export default useForumSections;
