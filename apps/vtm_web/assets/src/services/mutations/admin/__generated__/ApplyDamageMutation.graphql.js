/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type DamageType = "AGGRAVATED" | "SUPERFICIAL" | "%future added value";
export type ApplyDamageMutationVariables = {|
  characterId: string,
  damage: number,
  type: DamageType,
|};
export type ApplyDamageMutationResponse = {|
  +applyDamage: ?{|
    +result: ?string
  |}
|};
export type ApplyDamageMutation = {|
  variables: ApplyDamageMutationVariables,
  response: ApplyDamageMutationResponse,
|};


/*
mutation ApplyDamageMutation(
  $characterId: ID!
  $damage: Int!
  $type: DamageType!
) {
  applyDamage(input: {characterId: $characterId, damageEntity: $damage, type: $type}) {
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
    "name": "damage"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "type"
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
            "name": "damageEntity",
            "variableName": "damage"
          },
          {
            "kind": "Variable",
            "name": "type",
            "variableName": "type"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "ApplyDamagePayload",
    "kind": "LinkedField",
    "name": "applyDamage",
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
    "name": "ApplyDamageMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ApplyDamageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4b1288852f44258d515465fd51cbd975",
    "id": null,
    "metadata": {},
    "name": "ApplyDamageMutation",
    "operationKind": "mutation",
    "text": "mutation ApplyDamageMutation(\n  $characterId: ID!\n  $damage: Int!\n  $type: DamageType!\n) {\n  applyDamage(input: {characterId: $characterId, damageEntity: $damage, type: $type}) {\n    result\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '8b0ae85fbd0b72eb383e12900e0ee5dd';
module.exports = node;
