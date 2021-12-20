// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {ForumHasNewPostQuery as Query} from "./__generated__/ForumHasNewPostQuery.graphql";

export const ForumHasNewPostQuery: GraphQLTaggedNode = graphql`
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
    useCustomLazyLoadQuery<Query>(ForumHasNewPostQuery, {}, {
        fetchPolicy: "network-only"
    })?.getForumSections?.some(x => x?.hasNewPosts === true) ?? false;
