/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type HealWillpowerMutationVariables = {|
  characterId: string,
  quantity: number,
|};
export type HealWillpowerMutationResponse = {|
  +healWillpower: ?{|
    +result: ?string
  |}
|};
export type HealWillpowerMutation = {|
  variables: HealWillpowerMutationVariables,
  response: HealWillpowerMutationResponse,
|};


/*
mutation HealWillpowerMutation(
  $characterId: ID!
  $quantity: Int!
) {
  healWillpower(input: {characterId: $characterId, quantity: $quantity}) {
    result
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "characterId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "quantity"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "characterId",
            "variableName": "characterId"
          },
          {
            "kind": "Variable",
            "name": "quantity",
            "variableName": "quantity"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "HealWillpowerPayload",
    "kind": "LinkedField",
    "name": "healWillpower",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "result",
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
    "name": "HealWillpowerMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HealWillpowerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c5a64caa9fc0804d1f4240d5014b0653",
    "id": null,
    "metadata": {},
    "name": "HealWillpowerMutation",
    "operationKind": "mutation",
    "text": "mutation HealWillpowerMutation(\n  $characterId: ID!\n  $quantity: Int!\n) {\n  healWillpower(input: {characterId: $characterId, quantity: $quantity}) {\n    result\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'fc0e0d2daf6399e8ad7ec5ea7b739887';
module.exports = node;
