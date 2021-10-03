/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SessionQueryVariables = {||};
export type SessionQueryResponse = {|
  +sessionsList: ?$ReadOnlyArray<?{|
    +user: ?{|
      +id: string,
      +name: ?string,
    |},
    +character: ?{|
      +id: string,
      +name: ?string,
    |},
    +location: ?{|
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
    user {
      id
      name
    }
    character {
      id
      name
    }
    location {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Session",
    "kind": "LinkedField",
    "name": "sessionsList",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "character",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ChatLocation",
        "kind": "LinkedField",
        "name": "location",
        "plural": false,
        "selections": (v0/*: any*/),
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
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SessionQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "97475d07b040a59fe043a62136c2e3eb",
    "id": null,
    "metadata": {},
    "name": "SessionQuery",
    "operationKind": "query",
    "text": "query SessionQuery {\n  sessionsList {\n    user {\n      id\n      name\n    }\n    character {\n      id\n      name\n    }\n    location {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'bdbd4ad47392f10a9f3f8f52e51c98a6';
module.exports = node;
