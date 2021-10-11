/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ApproveCharacterMutationVariables = {|
  characterId: string
|};
export type ApproveCharacterMutationResponse = {|
  +approveCharacter: ?boolean
|};
export type ApproveCharacterMutation = {|
  variables: ApproveCharacterMutationVariables,
  response: ApproveCharacterMutationResponse,
|};


/*
mutation ApproveCharacterMutation(
  $characterId: ID!
) {
  approveCharacter(characterId: $characterId)
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
    "kind": "ScalarField",
    "name": "approveCharacter",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ApproveCharacterMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ApproveCharacterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3814c6e1752eb4ca8ab38ae5d102bdf2",
    "id": null,
    "metadata": {},
    "name": "ApproveCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation ApproveCharacterMutation(\n  $characterId: ID!\n) {\n  approveCharacter(characterId: $characterId)\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '110480632f7093db697a135d8218ee26';
module.exports = node;
