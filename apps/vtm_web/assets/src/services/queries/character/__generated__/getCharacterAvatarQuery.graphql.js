/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type getCharacterAvatarQueryVariables = {|
  id: string
|};
export type getCharacterAvatarQueryResponse = {|
  +getCharacter: ?{|
    +info: ?{|
      +id: ?string,
      +avatar: ?string,
    |}
  |}
|};
export type getCharacterAvatarQuery = {|
  variables: getCharacterAvatarQueryVariables,
  response: getCharacterAvatarQueryResponse,
|};


/*
query getCharacterAvatarQuery(
  $id: ID!
) {
  getCharacter(id: $id) {
    info {
      id
      avatar
    }
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
        "concreteType": "CharacterInfo",
        "kind": "LinkedField",
        "name": "info",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "getCharacterAvatarQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getCharacterAvatarQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "11f368acfb3b5f74c35fefe750c0657a",
    "id": null,
    "metadata": {},
    "name": "getCharacterAvatarQuery",
    "operationKind": "query",
    "text": "query getCharacterAvatarQuery(\n  $id: ID!\n) {\n  getCharacter(id: $id) {\n    info {\n      id\n      avatar\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '7dcf7b2d6514993d952ed36f81f7fab3';
module.exports = node;
