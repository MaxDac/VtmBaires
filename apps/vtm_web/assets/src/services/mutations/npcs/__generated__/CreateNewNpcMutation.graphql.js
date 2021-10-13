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
export type CreateNewNpcMutationVariables = {|
  request: CharacterCreationRequest
|};
export type CreateNewNpcMutationResponse = {|
  +createNpc: ?{|
    +id: string,
    +name: ?string,
  |}
|};
export type CreateNewNpcMutation = {|
  variables: CreateNewNpcMutationVariables,
  response: CreateNewNpcMutationResponse,
|};


/*
mutation CreateNewNpcMutation(
  $request: CharacterCreationRequest!
) {
  createNpc(request: $request) {
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
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "createNpc",
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
    "name": "CreateNewNpcMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateNewNpcMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7a2a3d4452b5a3f01bd53ccb27117306",
    "id": null,
    "metadata": {},
    "name": "CreateNewNpcMutation",
    "operationKind": "mutation",
    "text": "mutation CreateNewNpcMutation(\n  $request: CharacterCreationRequest!\n) {\n  createNpc(request: $request) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '671b393cc536b10ab2b44aa8fd519ff7';
module.exports = node;
