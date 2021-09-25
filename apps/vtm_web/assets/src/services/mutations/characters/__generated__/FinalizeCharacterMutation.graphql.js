/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type FinalizeCharacterMutationVariables = {|
  characterId: string
|};
export type FinalizeCharacterMutationResponse = {|
  +finalizeCharacter: ?{|
    +id: string
  |}
|};
export type FinalizeCharacterMutation = {|
  variables: FinalizeCharacterMutationVariables,
  response: FinalizeCharacterMutationResponse,
|};


/*
mutation FinalizeCharacterMutation(
  $characterId: ID!
) {
  finalizeCharacter(characterId: $characterId) {
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
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "finalizeCharacter",
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
    "name": "FinalizeCharacterMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FinalizeCharacterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8df4f1b7132da34222d6a44ddb23f838",
    "id": null,
    "metadata": {},
    "name": "FinalizeCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation FinalizeCharacterMutation(\n  $characterId: ID!\n) {\n  finalizeCharacter(characterId: $characterId) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '6bb7998ea4490e37f5843357d6f340b1';
module.exports = node;
