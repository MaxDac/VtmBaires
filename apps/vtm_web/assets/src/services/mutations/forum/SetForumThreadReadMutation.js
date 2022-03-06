// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";

const mutation = graphql`
    mutation SetForumThreadReadMutation($threadId: ID!) {
        setForumThreadRead(input: {threadId: $threadId}) {
            result
        }
    }
`;

const mutationPromise = (environment: IEnvironment, threadId: string): Promise<boolean> => {
    return wrapMutation<boolean>(environment, mutation, { threadId });
}

export default mutationPromise;
