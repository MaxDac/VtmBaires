/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetCharacterAvatarQueryVariables = {|
  id: string
|};
export type GetCharacterAvatarQueryResponse = {|
  +getCharacter: ?{|
    +id: string,
    +avatar: ?string,
  |}
|};
export type GetCharacterAvatarQuery = {|
  variables: GetCharacterAvatarQueryVariables,
  response: GetCharacterAvatarQueryResponse,
|};


/*
query GetCharacterAvatarQuery(
  $id: ID!
) {
  getCharacter(id: $id) {
    id
    avatar
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "getCharacter",
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
        "name": "avatar",
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
    "name": "GetCharacterAvatarQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetCharacterAvatarQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "27be9176cfd6cd21110b5c5d7f6e57ef",
    "id": null,
    "metadata": {},
    "name": "GetCharacterAvatarQuery",
    "operationKind": "query",
    "text": "query GetCharacterAvatarQuery(\n  $id: ID!\n) {\n  getCharacter(id: $id) {\n    id\n    avatar\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '6cd48e7bb79b7e7d741b2b4f9436b68d';
module.exports = node;
