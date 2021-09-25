/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SwitchCharacterAttributeMutationVariables = {|
  characterId: string,
  firstAttribute?: ?string,
  secondAttribute?: ?string,
|};
export type SwitchCharacterAttributeMutationResponse = {|
  +switchCharacterAttributes: ?{|
    +id: string
  |}
|};
export type SwitchCharacterAttributeMutation = {|
  variables: SwitchCharacterAttributeMutationVariables,
  response: SwitchCharacterAttributeMutationResponse,
|};


/*
mutation SwitchCharacterAttributeMutation(
  $characterId: ID!
  $firstAttribute: String
  $secondAttribute: String
) {
  switchCharacterAttributes(characterId: $characterId, firstAttribute: $firstAttribute, secondAttribute: $secondAttribute) {
    id
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
    "name": "firstAttribute"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "secondAttribute"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "characterId",
        "variableName": "characterId"
      },
      {
        "kind": "Variable",
        "name": "firstAttribute",
        "variableName": "firstAttribute"
      },
      {
        "kind": "Variable",
        "name": "secondAttribute",
        "variableName": "secondAttribute"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "switchCharacterAttributes",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SwitchCharacterAttributeMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SwitchCharacterAttributeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fc86b302702996913955d96d7f3ac6ed",
    "id": null,
    "metadata": {},
    "name": "SwitchCharacterAttributeMutation",
    "operationKind": "mutation",
    "text": "mutation SwitchCharacterAttributeMutation(\n  $characterId: ID!\n  $firstAttribute: String\n  $secondAttribute: String\n) {\n  switchCharacterAttributes(characterId: $characterId, firstAttribute: $firstAttribute, secondAttribute: $secondAttribute) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'aed961f4a1cb2e865f6e791c5663ad59';
module.exports = node;
