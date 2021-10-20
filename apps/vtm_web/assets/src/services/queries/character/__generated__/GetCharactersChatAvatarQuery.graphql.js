/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetCharactersChatAvatarQueryVariables = {|
  characterIds?: ?$ReadOnlyArray<string>
|};
export type GetCharactersChatAvatarQueryResponse = {|
  +getCharactersChatAvatar: ?$ReadOnlyArray<?{|
    +id: string,
    +chatAvatar: ?string,
  |}>
|};
export type GetCharactersChatAvatarQuery = {|
  variables: GetCharactersChatAvatarQueryVariables,
  response: GetCharactersChatAvatarQueryResponse,
|};


/*
query GetCharactersChatAvatarQuery(
  $characterIds: [ID!]
) {
  getCharactersChatAvatar(characterIds: $characterIds) {
    id
    chatAvatar
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
    "name": "getCharactersChatAvatar",
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
        "name": "chatAvatar",
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
    "name": "GetCharactersChatAvatarQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetCharactersChatAvatarQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f2630ff54da9952ae4a36b5b08c900ba",
    "id": null,
    "metadata": {},
    "name": "GetCharactersChatAvatarQuery",
    "operationKind": "query",
    "text": "query GetCharactersChatAvatarQuery(\n  $characterIds: [ID!]\n) {\n  getCharactersChatAvatar(characterIds: $characterIds) {\n    id\n    chatAvatar\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'be0e42c05fab7c52f44bbb92f81047f7';
module.exports = node;
