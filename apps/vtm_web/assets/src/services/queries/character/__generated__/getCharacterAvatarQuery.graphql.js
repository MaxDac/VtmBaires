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
  +getCharacterAvatar: ?{|
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
  getCharacterAvatar(characterId: $id) {
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
        "name": "characterId",
        "variableName": "id"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "getCharacterAvatar",
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
    "cacheID": "4b80efaf5023646fdd13e1cc6cce4891",
    "id": null,
    "metadata": {},
    "name": "GetCharacterAvatarQuery",
    "operationKind": "query",
    "text": "query GetCharacterAvatarQuery(\n  $id: ID!\n) {\n  getCharacterAvatar(characterId: $id) {\n    id\n    avatar\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '6b0fdd4ffa9a2c72aa683263e0c39936';
module.exports = node;
