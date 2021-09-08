// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapQuery } from "../../relay-utils";

import type {BaseInfo} from "../base-types";

const predatorTypesQuery = graphql`
    query predatorTypesQuery {
        predatorTypes {
            id
            name
        }
    }
`;

const exp = (): Promise<BaseInfo[]> =>
    wrapQuery(predatorTypesQuery, {})
        .then(({predatorTypes}) => predatorTypes);

export default exp;
