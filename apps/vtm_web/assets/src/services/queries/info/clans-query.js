// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapQuery } from "../../relay-utils";

import type {BaseInfo} from "../base-types";

const clansQuery = graphql`
    query clansQuery {
        clans {
            id
            name
        }
    }
`;

const exp = (): Promise<BaseInfo[]> =>
    wrapQuery(clansQuery, {})
        .then(({clans}) => clans);

export default exp;
