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
    +isComplete: ?boolean,
    +approved: ?boolean,
    +clan: ?{|
      +id: string,
      +name: ?string,
    |},
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
    isComplete
    approved
    clan {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "allNpcs",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
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
        "name": "isComplete",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "approved",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Clan",
        "kind": "LinkedField",
        "name": "clan",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
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
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GetAllNpcsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "77c23669aea9fe7b0c60d2d0d2c2d531",
    "id": null,
    "metadata": {},
    "name": "GetAllNpcsQuery",
    "operationKind": "query",
    "text": "query GetAllNpcsQuery {\n  allNpcs {\n    id\n    name\n    chatAvatar\n    isComplete\n    approved\n    clan {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '570aed6922c3a73d691566f69eab3ddc';
module.exports = node;
