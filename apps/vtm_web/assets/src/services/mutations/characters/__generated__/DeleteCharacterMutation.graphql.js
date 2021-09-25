/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type DeleteCharacterMutationVariables = {|
  characterId: string
|};
export type DeleteCharacterMutationResponse = {|
  +deleteCharacter: ?boolean
|};
export type DeleteCharacterMutation = {|
  variables: DeleteCharacterMutationVariables,
  response: DeleteCharacterMutationResponse,
|};


/*
mutation DeleteCharacterMutation(
  $characterId: ID!
) {
  deleteCharacter(characterId: $characterId)
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
    "name": "deleteCharacter",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteCharacterMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteCharacterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d353c9fca95704289c7c48ece4fef012",
    "id": null,
    "metadata": {},
    "name": "DeleteCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteCharacterMutation(\n  $characterId: ID!\n) {\n  deleteCharacter(characterId: $characterId)\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '2b84b0704cb82cded897393a9fc82c41';
module.exports = node;
