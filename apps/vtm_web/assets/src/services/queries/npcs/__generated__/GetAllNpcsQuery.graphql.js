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
    "cacheID": "e84abdbb1c5dd6d51234fc49b41f355c",
    "id": null,
    "metadata": {},
    "name": "GetAllNpcsQuery",
    "operationKind": "query",
    "text": "query GetAllNpcsQuery {\n  allNpcs {\n    id\n    name\n    chatAvatar\n    isComplete\n    approved\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '42fa68c2bc58343c5eab0ed1085b4531';
module.exports = node;
