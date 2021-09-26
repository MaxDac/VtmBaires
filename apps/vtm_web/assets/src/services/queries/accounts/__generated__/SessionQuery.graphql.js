/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SessionQueryVariables = {||};
export type SessionQueryResponse = {|
  +usersList: ?$ReadOnlyArray<?{|
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
  usersList {
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
    "name": "usersList",
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
    "cacheID": "db27d2bb0fb8df1719db1cebc607fa94",
    "id": null,
    "metadata": {},
    "name": "SessionQuery",
    "operationKind": "query",
    "text": "query SessionQuery {\n  usersList {\n    id\n    name\n    sessionCharacter {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '450472903221a4916da1cc9b1015d1cd';
module.exports = node;
