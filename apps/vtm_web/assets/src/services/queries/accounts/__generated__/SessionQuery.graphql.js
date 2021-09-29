/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SessionQueryVariables = {||};
export type SessionQueryResponse = {|
  +sessionsList: ?$ReadOnlyArray<?{|
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
  sessionsList {
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
    "name": "sessionsList",
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
    "cacheID": "bb870e5c8ef59693169f81216f4b2faf",
    "id": null,
    "metadata": {},
    "name": "SessionQuery",
    "operationKind": "query",
    "text": "query SessionQuery {\n  sessionsList {\n    id\n    name\n    sessionCharacter {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'b070f4b29bffc5c6a5b9a492f456735f';
module.exports = node;
