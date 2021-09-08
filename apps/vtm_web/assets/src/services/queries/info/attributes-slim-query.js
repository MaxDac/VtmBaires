// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapQuery } from "../../relay-utils";

import type {Attribute} from "./attributes-query";

const attributesSlimQuery = graphql`
    query attributesSlimQuery {
        attributes {
            id
            name
            attributeType {
                name
                section
            }
        }
    }
`;

const exp = (): Promise<Attribute[]> =>
    wrapQuery(attributesSlimQuery, {})
        .then(({attributes}) => attributes);

export default exp;
