/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CharacterCreationRequest = {|
  avatar?: ?string,
  biography: string,
  chatAvatar?: ?string,
  clanId: string,
  description: string,
  isNpc?: ?number,
  name: string,
|};
export type CreateCharacterMutationVariables = {|
  request: CharacterCreationRequest
|};
export type CreateCharacterMutationResponse = {|
  +createCharacter: ?{|
    +id: string,
    +name: ?string,
  |}
|};
export type CreateCharacterMutation = {|
  variables: CreateCharacterMutationVariables,
  response: CreateCharacterMutationResponse,
|};


/*
mutation CreateCharacterMutation(
  $request: CharacterCreationRequest!
) {
  createCharacter(request: $request) {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "kind": "Variable",
        "name": "request",
        "variableName": "request"
      }
    ],
    "concreteType": "CharacterInfo",
    "kind": "LinkedField",
    "name": "createCharacter",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
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
    "name": "CreateCharacterMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateCharacterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "070e9b2701221b0004a9723f82f79474",
    "id": null,
    "metadata": {},
    "name": "CreateCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation CreateCharacterMutation(\n  $request: CharacterCreationRequest!\n) {\n  createCharacter(request: $request) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'c79143d3a89a44dbcee572e5368a19a0';
module.exports = node;
