// @flow

import graphql from 'babel-plugin-relay/macro';
import type { Query } from "relay-runtime/util/RelayRuntimeTypes";
import type {
  GetHavensQueryResponse,
  GetHavensQueryVariables,
} from "./__generated__/GetHavensQuery.graphql";

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

export const getHavensQuery: Query<GetHavensQueryVariables, GetHavensQueryResponse> = graphql`
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
