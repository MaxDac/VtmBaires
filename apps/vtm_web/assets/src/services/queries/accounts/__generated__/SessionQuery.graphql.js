/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SessionQueryVariables = {||};
export type SessionQueryResponse = {|
  +list: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +sessionCharacter: ?{|
      +id: string,
      +name: ?string,
    |},
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
    sessionCharacter {
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "list",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "sessionCharacter",
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
    "name": "SessionQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SessionQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "469f561d599f667e9e2eebc1c17e30ef",
    "id": null,
    "metadata": {},
    "name": "SessionQuery",
    "operationKind": "query",
    "text": "query SessionQuery {\n  list {\n    id\n    name\n    sessionCharacter {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '6155c848a923b5b45bcc127ba2d463b4';
module.exports = node;
