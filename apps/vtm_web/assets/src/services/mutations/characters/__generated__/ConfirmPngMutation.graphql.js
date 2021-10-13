/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ConfirmPngMutationVariables = {|
  characterId: string
|};
export type ConfirmPngMutationResponse = {|
  +confirmPng: ?{|
    +response: ?{|
      +id: string
    |}
  |}
|};
export type ConfirmPngMutation = {|
  variables: ConfirmPngMutationVariables,
  response: ConfirmPngMutationResponse,
|};


/*
mutation ConfirmPngMutation(
  $characterId: ID!
) {
  confirmPng(input: {characterId: $characterId}) {
    response {
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
    "concreteType": "ConfirmPngPayload",
    "kind": "LinkedField",
    "name": "confirmPng",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "response",
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
    "name": "ConfirmPngMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConfirmPngMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "30338a766b9214c3af48fa6e3be39a21",
    "id": null,
    "metadata": {},
    "name": "ConfirmPngMutation",
    "operationKind": "mutation",
    "text": "mutation ConfirmPngMutation(\n  $characterId: ID!\n) {\n  confirmPng(input: {characterId: $characterId}) {\n    response {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'b2b110b3021b766c4f3a9be2b59448d1';
module.exports = node;
