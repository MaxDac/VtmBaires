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
    "cacheID": "f50338d6c2b0558ca83ece96bacdc215",
    "id": null,
    "metadata": {},
    "name": "GetAllNpcsQuery",
    "operationKind": "query",
    "text": "query GetAllNpcsQuery {\n  allNpcs {\n    id\n    name\n    chatAvatar\n    isComplete\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '378a786f5af644ae4cc2fd3e91cb8059';
module.exports = node;
