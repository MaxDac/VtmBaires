/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SessionQueryVariables = {||};
export type SessionQueryResponse = {|
  +list: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
  |}>
|};
export type SessionQuery = {|
  variables: SessionQueryVariables,
  response: SessionQueryResponse,
|};


/*
query SessionQuery {
  list {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "list",
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
    "name": "SessionQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SessionQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "c2acec25b2f3ceaebc0fb05473f5c9e3",
    "id": null,
    "metadata": {},
    "name": "SessionQuery",
    "operationKind": "query",
    "text": "query SessionQuery {\n  list {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'f8d9a0a975f62ab324ff649f3533d342';
module.exports = node;
