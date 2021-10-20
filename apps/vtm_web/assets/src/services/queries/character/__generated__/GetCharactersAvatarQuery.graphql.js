/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetCharactersAvatarQueryVariables = {|
  characterIds?: ?$ReadOnlyArray<string>
|};
export type GetCharactersAvatarQueryResponse = {|
  +getCharactersAvatar: ?$ReadOnlyArray<?{|
    +id: string,
    +avatar: ?string,
  |}>
|};
export type GetCharactersAvatarQuery = {|
  variables: GetCharactersAvatarQueryVariables,
  response: GetCharactersAvatarQueryResponse,
|};


/*
query GetCharactersAvatarQuery(
  $characterIds: [ID!]
) {
  getCharactersAvatar(characterIds: $characterIds) {
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
    "name": "characterIds"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "characterIds",
        "variableName": "characterIds"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "getCharactersAvatar",
    "plural": true,
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
    "name": "GetCharactersAvatarQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetCharactersAvatarQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "72af1e00e5e1fa6e2b538047bda57e40",
    "id": null,
    "metadata": {},
    "name": "GetCharactersAvatarQuery",
    "operationKind": "query",
    "text": "query GetCharactersAvatarQuery(\n  $characterIds: [ID!]\n) {\n  getCharactersAvatar(characterIds: $characterIds) {\n    id\n    avatar\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'dfa4796ef197c315770fd607c4f81246';
module.exports = node;
