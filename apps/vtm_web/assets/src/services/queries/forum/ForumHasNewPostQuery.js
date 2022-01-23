// @flow

import graphql from 'babel-plugin-relay/macro';
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {
  ForumHasNewPostQueryResponse,
  ForumHasNewPostQueryVariables,
} from "./__generated__/ForumHasNewPostQuery.graphql";
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import { emptyExactObject } from "../../../_base/utils";

export const ForumHasNewPostQuery: Query<ForumHasNewPostQueryVariables, ForumHasNewPostQueryResponse> = graphql`
    query ForumHasNewPostQuery {
        getForumSections {
            hasNewPosts
        }
    }
`;

/**
 * Determines whether the forum has new messages.
 * @return {boolean} True if the forum has new messages, False otherwise.
 */
export const useForumHasNewPosts = (): boolean =>
    useCustomLazyLoadQuery(ForumHasNewPostQuery, emptyExactObject(), {
        fetchPolicy: "network-only"
    })?.getForumSections?.some(x => x?.hasNewPosts === true) ?? false;
