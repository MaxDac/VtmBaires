/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SessionCharacterQueryVariables = {||};
export type SessionCharacterQueryResponse = {|
  +getSessionCharacter: ?{|
    +id: string,
    +name: ?string,
  |}
|};
export type SessionCharacterQuery = {|
  variables: SessionCharacterQueryVariables,
  response: SessionCharacterQueryResponse,
|};


/*
query SessionCharacterQuery {
  getSessionCharacter {
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
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "getSessionCharacter",
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
    "name": "SessionCharacterQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SessionCharacterQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0164eb1677025597512206d543e0feaf",
    "id": null,
    "metadata": {},
    "name": "SessionCharacterQuery",
    "operationKind": "query",
    "text": "query SessionCharacterQuery {\n  getSessionCharacter {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'fb2dbea65a0bede97cc0eadbe6fb5fde';
module.exports = node;
