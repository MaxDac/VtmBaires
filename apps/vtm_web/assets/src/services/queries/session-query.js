// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapQueryAuthorized } from "../relay-utils";

const listSessionQuery = graphql`
    query sessionQuery {
        list {
            id
            name
        }
    }
`;

export type Session = {
    id: string;
    name: string;
};

export type SessionResponse = {
    list: Session[]
}

const sessionQuery = (): Promise<SessionResponse> => wrapQueryAuthorized(listSessionQuery, {});

export default sessionQuery;
