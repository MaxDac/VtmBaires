/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetCharacterDescriptionQueryVariables = {|
  id: string
|};
export type GetCharacterDescriptionQueryResponse = {|
  +getCharacterDescription: ?{|
    +id: string,
    +name: ?string,
    +chatAvatar: ?string,
    +description: ?string,
  |}
|};
export type GetCharacterDescriptionQuery = {|
  variables: GetCharacterDescriptionQueryVariables,
  response: GetCharacterDescriptionQueryResponse,
|};


/*
query GetCharacterDescriptionQuery(
  $id: ID!
) {
  getCharacterDescription(characterId: $id) {
    id
    name
    chatAvatar
    description
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
    "name": "getCharacterDescription",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "chatAvatar",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
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
    "name": "GetCharacterDescriptionQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetCharacterDescriptionQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5a4191a128e7ed547ae33d0b80dcc46f",
    "id": null,
    "metadata": {},
    "name": "GetCharacterDescriptionQuery",
    "operationKind": "query",
    "text": "query GetCharacterDescriptionQuery(\n  $id: ID!\n) {\n  getCharacterDescription(characterId: $id) {\n    id\n    name\n    chatAvatar\n    description\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '6d9fe282dee024f6b1da5b7d07ed60e1';
module.exports = node;
