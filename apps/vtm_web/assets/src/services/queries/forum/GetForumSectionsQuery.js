// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import type {GetForumSectionsQuery, GetForumSectionsQueryResponse} from "./__generated__/GetForumSectionsQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

export const getForumSectionsQuery: GraphQLTaggedNode = graphql`
    query GetForumSectionsQuery {
        getForumSections {
            id
            title
            description
            onGame
            canView
            canEdit
        }
    }
`;

const useForumSections = (): GetForumSectionsQueryResponse =>
    useCustomLazyLoadQuery<GetForumSectionsQuery>(getForumSectionsQuery, {}, {
        fetchPolicy: "store-or-network"
    });

export default useForumSections;
