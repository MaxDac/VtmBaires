/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChangeCharacterOtherStatsInput = {|
  characterId: string,
  humanity: number,
  predatorTypeId: string,
  willpower: number,
|};
export type ChangeCharacterOtherStatsMutationVariables = {|
  input: ChangeCharacterOtherStatsInput
|};
export type ChangeCharacterOtherStatsMutationResponse = {|
  +changeCharacterOtherStats: ?{|
    +result: ?{|
      +id: string
    |}
  |}
|};
export type ChangeCharacterOtherStatsMutation = {|
  variables: ChangeCharacterOtherStatsMutationVariables,
  response: ChangeCharacterOtherStatsMutationResponse,
|};


/*
mutation ChangeCharacterOtherStatsMutation(
  $input: ChangeCharacterOtherStatsInput!
) {
  changeCharacterOtherStats(input: $input) {
    result {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ChangeCharacterOtherStatsPayload",
    "kind": "LinkedField",
    "name": "changeCharacterOtherStats",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "result",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeCharacterOtherStatsMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCharacterOtherStatsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3dbd682096f870f3b86b3d59f7641704",
    "id": null,
    "metadata": {},
    "name": "ChangeCharacterOtherStatsMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeCharacterOtherStatsMutation(\n  $input: ChangeCharacterOtherStatsInput!\n) {\n  changeCharacterOtherStats(input: $input) {\n    result {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '4f2327b86462ba6153e6da0e930f13d5';
module.exports = node;
