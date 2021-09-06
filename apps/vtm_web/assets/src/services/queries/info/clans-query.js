// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapQuery } from "../../relay-utils";

const clansQuery = graphql`
    query clansQuery {
        clans {
            id
            name
        }
    }
`;

export type Clan = {
    id: string;
    name: string;
};

export type ClansResponse = {
    clans: Clan[]
}

const exp = (): Promise<ClansResponse> => wrapQuery(clansQuery, {});

export default exp;
