// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";

export type Haven = {|
    +id: string,
    +name: ?string,
    +x: ?number,
    +y: ?number,
    +resonance: ?string;
    +danger: ?number,
    +difficulty: ?number,
    +groundControl: ?number,
    +ownerDifficulty: ?number,
    +resourcesLevel: ?number,
    +character: ?{|
        +id: string,
        +name: ?string,
    |},
|};

export const getHavensQuery: GraphQLTaggedNode = graphql`
    query GetHavensQuery {
        getHavens {
            result {
                id
                name
                x
                y
                resonance
                danger
                difficulty
                groundControl
                ownerDifficulty
                resourcesLevel
                character {
                    id
                    name
                }
            }
        }
    }
`;
