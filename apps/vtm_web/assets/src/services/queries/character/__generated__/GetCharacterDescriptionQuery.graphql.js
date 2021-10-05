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
  +getCharacter: ?{|
    +id: string,
    +name: ?string,
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
  getCharacter(id: $id) {
    id
    name
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
        "name": "name",
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
    "cacheID": "24d0df529574189e388f598f47dfbdd7",
    "id": null,
    "metadata": {},
    "name": "GetCharacterDescriptionQuery",
    "operationKind": "query",
    "text": "query GetCharacterDescriptionQuery(\n  $id: ID!\n) {\n  getCharacter(id: $id) {\n    id\n    name\n    description\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'e5207cf8f4ea5bcad873955345f6af6f';
module.exports = node;
