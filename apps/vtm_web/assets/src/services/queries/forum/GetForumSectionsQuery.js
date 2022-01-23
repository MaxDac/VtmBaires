// @flow

import graphql from 'babel-plugin-relay/macro';
import type {
  GetForumSectionsQueryResponse,
  GetForumSectionsQueryVariables,
} from "./__generated__/GetForumSectionsQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import { emptyExactObject } from "../../../_base/utils";

export const getForumSectionsQuery: Query<GetForumSectionsQueryVariables, GetForumSectionsQueryResponse> = graphql`
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
    useCustomLazyLoadQuery(getForumSectionsQuery, emptyExactObject(), {
        // store and network for checking new messages notifications
        fetchPolicy: "store-and-network"
    });

export default useForumSections;
