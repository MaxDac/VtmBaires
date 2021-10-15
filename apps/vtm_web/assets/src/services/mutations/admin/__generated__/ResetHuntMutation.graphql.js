/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ResetHuntMutationVariables = {|
  characterId: string
|};
export type ResetHuntMutationResponse = {|
  +resetCharacterHunt: ?{|
    +result: ?{|
      +id: string
    |}
  |}
|};
export type ResetHuntMutation = {|
  variables: ResetHuntMutationVariables,
  response: ResetHuntMutationResponse,
|};


/*
mutation ResetHuntMutation(
  $characterId: ID!
) {
  resetCharacterHunt(input: {characterId: $characterId}) {
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
    "name": "characterId"
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
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "ResetCharacterHuntPayload",
    "kind": "LinkedField",
    "name": "resetCharacterHunt",
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
    "name": "ResetHuntMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResetHuntMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6967bbaf4184c12d36ebda8bdf285ec6",
    "id": null,
    "metadata": {},
    "name": "ResetHuntMutation",
    "operationKind": "mutation",
    "text": "mutation ResetHuntMutation(\n  $characterId: ID!\n) {\n  resetCharacterHunt(input: {characterId: $characterId}) {\n    result {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '82682a21260d241a8f78f4cadcfdc07f';
module.exports = node;
