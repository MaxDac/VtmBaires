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
    +approved: ?boolean,
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
    "cacheID": "bcfa2809da35003c69a564328dc3eca6",
    "id": null,
    "metadata": {},
    "name": "SessionCharacterQuery",
    "operationKind": "query",
    "text": "query SessionCharacterQuery {\n  getSessionCharacter {\n    id\n    name\n    approved\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'f29f63ab9d9f0f93fcfe23aef702b88a';
module.exports = node;
