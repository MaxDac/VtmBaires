/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetAllNpcsQueryVariables = {||};
export type GetAllNpcsQueryResponse = {|
  +allNpcs: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +chatAvatar: ?string,
  |}>
|};
export type GetAllNpcsQuery = {|
  variables: GetAllNpcsQueryVariables,
  response: GetAllNpcsQueryResponse,
|};


/*
query GetAllNpcsQuery {
  allNpcs {
    id
    name
    chatAvatar
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "allNpcs",
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
        "name": "name",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetAllNpcsQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GetAllNpcsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "4375b6fd660deb49487a1f8299eab085",
    "id": null,
    "metadata": {},
    "name": "GetAllNpcsQuery",
    "operationKind": "query",
    "text": "query GetAllNpcsQuery {\n  allNpcs {\n    id\n    name\n    chatAvatar\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'f8abc0c4daf2a310963e7b6fcc0b5fde';
module.exports = node;
