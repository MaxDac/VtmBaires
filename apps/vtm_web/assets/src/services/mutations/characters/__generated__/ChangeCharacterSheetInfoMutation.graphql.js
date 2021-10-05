/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChangeSheetInfoRequest = {|
  avatar?: ?string,
  biography?: ?string,
  chatAvatar?: ?string,
  description?: ?string,
|};
export type ChangeCharacterSheetInfoMutationVariables = {|
  characterId: string,
  request: ChangeSheetInfoRequest,
|};
export type ChangeCharacterSheetInfoMutationResponse = {|
  +changeSheetInfo: ?{|
    +result: ?{|
      +id: string
    |}
  |}
|};
export type ChangeCharacterSheetInfoMutation = {|
  variables: ChangeCharacterSheetInfoMutationVariables,
  response: ChangeCharacterSheetInfoMutationResponse,
|};


/*
mutation ChangeCharacterSheetInfoMutation(
  $characterId: ID!
  $request: ChangeSheetInfoRequest!
) {
  changeSheetInfo(input: {characterId: $characterId, request: $request}) {
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "request"
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
            "name": "request",
            "variableName": "request"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "ChangeSheetInfoPayload",
    "kind": "LinkedField",
    "name": "changeSheetInfo",
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
    "name": "ChangeCharacterSheetInfoMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCharacterSheetInfoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e68f9cb549ef24d524f957f8592f227a",
    "id": null,
    "metadata": {},
    "name": "ChangeCharacterSheetInfoMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeCharacterSheetInfoMutation(\n  $characterId: ID!\n  $request: ChangeSheetInfoRequest!\n) {\n  changeSheetInfo(input: {characterId: $characterId, request: $request}) {\n    result {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '56840038df78209494a33ef3c4f3ee27';
module.exports = node;
